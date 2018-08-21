import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';

import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import PropTypes from "prop-types";
import DeleteDialog from "../dialog/DeleteDialog";
import FormDialog from "../dialog/FormDialog";

const styles = theme => ({
    card: {
        width: '100%',
    },
    media: {
        objectFit: 'cover',
    },
    grid: {
        width: '100%',
    }
});

class BookItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            title: '',
            author: '',
            image: '',
            date: '',
            open: true,
            dialogTitle: "Edit Book",
            dialogButton: "Edit",
        };
        this.callModalWithValues = this.callModalWithValues.bind(this);
    }

    callModalWithValues({ id, title, author, image, date }) {
        this.setState({ id, title, author, image, date, open: true, dialogTitle: "Edit Book", dialogButton: "Edit", });
    }

    render() {
        const { books, classes } = this.props;

        return (
            <Grid container spacing={16} direction="column"  justify="center" alignItems="center">
                {books.map( book =>
                    <Grid item xs={12} md={6} key={book.id} className={classes.grid}>
                        <Card className={classes.card}>
                            <CardMedia
                                component="img"
                                height="400"
                                className={classes.media}
                                image = { book.image }
                                title="Contemplative Reptile"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="headline" component="h2">{book.title}</Typography>
                                <Typography component="p">Date: {book.date}</Typography>
                                <Typography component="p">Author: {book.author}</Typography>
                            </CardContent>
                            <CardActions>
                                <FormDialog book={book} />
                                <DeleteDialog book={book} />
                            </CardActions>
                        </Card>
                    </Grid>
                )}
            </Grid>
        );
    };
}

BookItem.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BookItem);
