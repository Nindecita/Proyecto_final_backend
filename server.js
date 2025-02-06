import express from "express"
import cors from "cors"
import dotenv from "dotenv";
//import {logger} from "logger-express" 
dotenv.config();
import userRoutes from "./config/routes/users.routes.js"
import publicationRoutes from "./config/routes/publications.routes.js"
import orderRoutes from "./config/routes/orders.routes.js"
import commentRoutes from "./config/routes/comments.routes.js"
import orderDetailRoutes from "./config/routes/order_details.routes.js"
import loginAuthRoutes from "./config/routes/loginAuth.routes.js"




const app = express();

const port = process.env.PORT || 3000;

//Middleware
//app.use(logger())
app.use(express.json());
app.use(cors());


app.use("/api", userRoutes)
app.use("/api", publicationRoutes)
app.use("/api", orderRoutes)
app.use("/api", commentRoutes)
app.use("/api", orderDetailRoutes)
app.use("/api", loginAuthRoutes)

//Inicializamos el servidor en el puerto 3000
app.listen(port, console.log(`¡Servidor encendido en el puerto! ${port}`));

export default app;
