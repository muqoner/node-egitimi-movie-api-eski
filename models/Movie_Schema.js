const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MovieSchema = new Schema({
    director_id: Schema.Types.ObjectId,
    title: {
        type: String,
        required: [true, "`{PATH}` alanı zorunludur"],
        maxlength: [15, "{PATH} alanı ({VALUE}), ({MAXLENGTH})ten küçük olmalıdır "],
        minlength: [3, "{PATH} alanı ({VALUE}), ({MINLENGTH})ten büyük olmalıdır"]
    },
    category: String,
    country: String,
    year: Number,
    imdb_score: Number,
    creatAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("movie", MovieSchema);