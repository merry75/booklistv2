import React, { Component } from "react";
import { connect } from "react-redux";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import { formatTitle } from "../utils/FormatTitle";
import FormHelperText from "@material-ui/core/FormHelperText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { addBook, editBook } from "../../actions/bookActions";
import uuidv4 from "uuid/v4";

const styles = theme => ({
  dialog: {
    minWidth: 0
  }
});

class AddBookForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      id: "",
      title: "",
      author: "",
      image: "",
      date: "",
      errors: { title: false, author: false, date: false },
      isTitleExist: false
    };

    this.callModalWithValues = this.callModalWithValues.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.setStateNull = this.setStateNull.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateFields = this.validateFields.bind(this);
  }

  callModalWithValues({ id, title, author, image, date }) {
    this.setState({
      id,
      title,
      author,
      image,
      date,
      open: true,
      dialogTitle: "Add a Book",
      dialogButton: "Add"
    });
  }

  handleInputChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    const fieldName = e.target.name;
    if (e.target.value === "" && e.target.name !== "image") {
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          [fieldName]: true
        }
      }));
    } else {
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          [fieldName]: false
        }
      }));
    }
  }

  handleTitleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    if (
      this.props.books.find(book => book.title === formatTitle(e.target.value))
    ) {
      this.setState({ isTitleExist: true });
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          title: true
        }
      }));
    } else {
      this.setState({ isTitleExist: false });
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          title: false
        }
      }));
    }
    if (e.target.value === "") {
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          title: true
        }
      }));
    }
  }

  handleClose() {
    this.setStateNull();
  }

  setStateNull() {
    this.setState({
      open: false,
      id: "",
      title: "",
      author: "",
      image: "",
      date: "",
      errors: { title: false, author: false, date: false },
      isTitleExist: false
    });
  }

  handleSubmit() {
    if (this.validateFields() && !this.state.isTitleExist) {
      this.props.addBook({
        ...this.props.book,
        id: uuidv4(),
        title: formatTitle(this.state.title),
        author: this.state.author,
        date: this.state.date,
        image: this.state.image
      });
      this.setStateNull();
    }
  }

  validateFields() {
    let { title, author, date } = this.state;

    if (
      title !== "" &&
      title !== undefined &&
      author !== "" &&
      author !== undefined &&
      date !== "" &&
      date !== undefined
    ) {
      return true;
    }

    title = title === undefined ? "" : title;
    author = author === undefined ? "" : author;
    date = date === undefined ? "" : date;

    const isTitleExist = this.props.books.find(
      book => book.title === formatTitle(title)
    );

    if (isTitleExist !== undefined) {
      this.setState({ isTitleExist: true });
    } else if (title === "" || title === undefined)
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          title: true
        }
      }));
    if (author === "" || author === undefined)
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          author: true
        }
      }));
    if (date === "" || date === undefined)
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          date: true
        }
      }));

    return false;
  }

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Button onClick={this.callModalWithValues} color="inherit">
          Add new
        </Button>
        <Dialog
          fullWidth={true}
          open={this.state.open}
          className={classes.dialog}
          onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            {this.state.dialogTitle}
          </DialogTitle>
          <DialogContent>
            <TextField
              error={this.state.errors.title || this.state.isTitleExist}
              autoFocus
              margin="normal"
              id="title"
              label={
                this.state.isTitleExist
                  ? `"${formatTitle(this.state.title)}" - Already exists.`
                  : this.state.errors.title
                    ? "This field is required"
                    : "Title"
              }
              name="title"
              value={this.state.title}
              onChange={this.handleTitleChange}
              type="text"
              fullWidth
            />
            <TextField
              error={this.state.errors.author}
              autoFocus
              margin="dense"
              id="author"
              label={
                this.state.errors.author ? "This field is required" : "Author"
              }
              name="author"
              value={this.state.author}
              onChange={this.handleInputChange}
              type="text"
              fullWidth
            />
            <TextField
              autoFocus
              margin="normal"
              id="image"
              label="Image"
              name="image"
              value={this.state.image}
              onChange={this.handleInputChange}
              type="text"
              fullWidth
            />
            <TextField
              error={this.state.errors.date}
              autoFocus
              margin="normal"
              id="date"
              name="date"
              value={this.state.date}
              onChange={this.handleInputChange}
              type="date"
              fullWidth
            />
            <FormHelperText error={this.state.errors.date} id="date">
              {this.state.errors.date ? "This field is required" : ""}
            </FormHelperText>
          </DialogContent>
          <DialogActions>
            <Button
              variant="outlined"
              onClick={this.handleClose}
              color="primary"
            >
              Cancel
            </Button>
            <Button
              variant="outlined"
              onClick={this.handleSubmit}
              color="primary"
              autoFocus
            >
              {this.state.dialogButton}
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}

AddBookForm.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  books: state.book.books
});

export default connect(
  mapStateToProps,
  { addBook, editBook }
)(withStyles(styles)(AddBookForm));
