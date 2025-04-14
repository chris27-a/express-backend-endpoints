import userRoutes from "./users.routes.js";
import postsRoutes from "./posts.routes.js"
import commentRoutes from "./comment.routes.js"
import categoryRoutes from "./category.router.js"
import express from "express"

const routes = express.Router();

routes.use("/comments", commentRoutes)
routes.use("/users", userRoutes)
routes.use("/posts", postsRoutes)
routes.use("/categories", categoryRoutes)

export default routes