const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override')
const handlebars = require("express-handlebars");
const path = require("path");
const app = express();
require('dotenv').config()
const PORT = process.env.PORT;
const route = require('./routes');
const db = require('./config/db');
const SortMiddleware = require('./app/middlewares/SortMiddleware')

// Connect to DB
db.connect()

// app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(path.join(__dirname, 'public/css'), { headers: { 'Content-Type': 'text/css' } }));

// Middleware (body-parser)
app.use(express.urlencoded({ extended: true }))
app.use(express.json());

app.use(methodOverride('_method'))

// Custom middlewares
app.use(SortMiddleware);

// HTTP logger
// app.use(morgan('combined'));

// Template engine (handlebars)
app.engine(
  "hbs",
  handlebars.engine({
    extname: ".hbs",
    helpers: {
		sum: (a, b) => a + b,
		sortTable: (field, sort) => {
			// Xử lí khi sort thằng nào thì chỉ thằng đó thay đổi
			const sortType = field === sort.column ? sort.type : 'default';
			const icons = {
				default: 'fa-solid fa-sort',
				asc: 'fa-solid fa-sort-up',
				desc: 'fa-solid fa-sort-down',
			}
			const types = {
				default: 'desc',
				asc: 'desc',
				desc: 'asc',
			}
			const icon = icons[sortType]
			const type = types[sortType]

			return ` <a href="?_sort&column=${field}&type=${type}" class="ms-2" ">
                        <i class="${icon}"></i>
                    </a>
					`
		}	
		}
	})
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname,"resources", "views"));

// Routes Init
route(app);


app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
})
