const mongoose = require("mongoose");
mongoose.connect(process.env.MONGOOSE_API, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false });
