import React, { Component } from "react";
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";

import { withStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import CssBaseline from "@material-ui/core/CssBaseline";
import IconButton from "@material-ui/core/IconButton";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";

import { getBooks } from "../../actions/bookActions";
import BookItem from "./BookItem";
import AddBookForm from "../dialog/AddBookForm";

const styles = theme => ({
  layout: {
    width: "auto",
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1000,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  appBar: {
    backgroundColor: "#2196f3",
    marginBottom: theme.spacing.unit * 2
  },
  flex: {
    flexGrow: 1
  }
});

class BookList extends Component {
  componentDidMount() {
    this.props.getBooks();
  }

  render() {
    const { classes, books } = this.props;

    return (
      <React.Fragment>
        <CssBaseline />
        <div className={classes.layout}>
          <AppBar position="static" className={classes.appBar}>
            <Toolbar>
              <IconButton color="inherit" aria-label="Menu">
                <MenuIcon />
              </IconButton>
              <Typography
                variant="title"
                color="inherit"
                className={classes.flex}
              >
                Herolo Library
              </Typography>
              <AddBookForm />
            </Toolbar>
          </AppBar>
        </div>
        <div className={classes.layout}>
          <BookItem books={books} />
        </div>
      </React.Fragment>
    );
  }
}

BookList.propTypes = {
  classes: PropTypes.object.isRequired,
  getBooks: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  books: state.book.books
});

export default connect(
  mapStateToProps,
  { getBooks }
)(withStyles(styles)(BookList));
