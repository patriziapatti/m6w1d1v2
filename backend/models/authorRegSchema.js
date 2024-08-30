import {model, Schema} from 'mongoose'

const authorRegSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        surname: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,         

        },
        avatar: {
            type: String,
        },
        verifiedAt: Date,
        verificationCode: String,
    },
    {collection: "authorsR", timestamps: true}
)
export default model("AuthorR", authorRegSchema)