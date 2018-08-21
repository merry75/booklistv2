import React, { Component } from "react";
import { connect } from "react-redux";

import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";

import { deleteBook } from "../../actions/bookActions";

class DeleteDialog extends Component {
    constructor(props){
        super(props);
        this.state = {
            deleteDialog: false,
            deleteBook: '',
            deleteBookId: '',
        };
        this.callDeleteDialog = this.callDeleteDialog.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.setStateNull = this.setStateNull.bind(this);
        this.handleDeleteBook = this.handleDeleteBook.bind(this);
    }

    callDeleteDialog({ id, title }) {
        this.setState({ deleteDialog: true, deleteBook: title, deleteBookId: id });
    }

    handleDeleteBook() {
        this.props.deleteBook({ id: this.state.deleteBookId });
        this.setStateNull();
    }

    handleClose () {
        this.setStateNull();
    };

    setStateNull () {
        this.setState({
            deleteDialog: false,
            deleteBook: '',
            deleteBookId: '',
        });
    }

    render () {
        const { book } = this.props;
        return (
            <React.Fragment>
                <Button onClick={() => this.callDeleteDialog(book)} size="small" color="secondary">Delete</Button>
                <Dialog
                    fullWidth={true}
                    open={this.state.deleteDialog}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description">

                    <DialogTitle id="alert-dialog-slide-title">
                        {"Delete Your Book"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            You are going to delete book: {this.state.deleteBook}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="default">
                            Disagree
                        </Button>
                        <Button onClick={this.handleDeleteBook} color="primary">
                            Agree
                        </Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    books: state.book.books
});

export default connect(mapStateToProps, { deleteBook })(DeleteDialog);
