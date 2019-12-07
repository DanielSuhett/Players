require("dotenv").config();

module.exports = app => {
    app.listen(process.env.PORT || 3000, () => {
        console.log(`Players API on ${process.env.PORT || 3000}`)
    });
}