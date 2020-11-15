const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  authors: [{
    type: authorSchema,
    required: true
  }]
}));

async function createCourse(name, authors) {
  const course = new Course({
    name,
    authors
  });

  const result = await course.save();
  console.log(result);
}

async function updateCourse(courseId) {
  const course = await Course.update({ _id: courseId }, {
    $set: {
      "author.name": "Assane"
    }
  })
  console.log(course)
}

async function addAuthor(courseId, author){
  const course = await Course.findById(courseId)
  course.authors.push(author)
  course.save()
  console.log(course)
}

async function removeAuthor(courseId, authorId){
  const course = await Course.findById(courseId)
  const author = course.authors.id(authorId)
  author.remove()
  course.save()
  console.log(course)
}

async function listCourses() {
  const courses = await Course.find();
  console.log(courses);
}

removeAuthor("5fb19bc1de52442aa8d77545", "5fb19d45abf71531f3cb5722")

addAuthor("5fb19bc1de52442aa8d77545", 
new Author({
  name: "Josapha"
}))

createCourse('Node Course', [
  new Author({ name: 'Mosh' }),
    new Author({ name: 'Assane' }),
]);
updateCourse("5fb196b4737a0e217e9aff7a")