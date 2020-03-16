// localhost:27017
const mongoose = require('mongoose');

import { Points, Users } from './schemas';

mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true});