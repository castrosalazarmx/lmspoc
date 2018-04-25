/**
 * Responds to any HTTP request that can provide a "message" field in the body.
 *
 * @param {!Object} req Cloud Function request context.
 * @param {!Object} res Cloud Function response context.
 */
const Datastore = new require("@google-cloud/datastore");

// Your Google Cloud Platform project ID
const projectId = 'unitylearn-201416';

// Creates a client
const datastore = new Datastore({
  projectId: projectId,
});


exports.helloWorld = (req, res) => {
  // The kind for the new entity
const kind = 'Task';
// The name/ID for the new entity
const name = 'sampletask1' + (Math.floor(Math.random() * Math.floor(500)));
// The Cloud Datastore key for the new entity
const taskKey = datastore.key([kind, name]);

// Prepares the new entity
const task = {
  key: taskKey,
  data: {
    description: 'Buy milk',
  },
};
  
  // Saves the entity
	datastore
  	.save(task)
  	.then(() => {
    	console.log(`Saved ${task.key.name}: ${task.data.description}`);
  		res.status(200).send('Success: ' + task.key.name);
  	})
  	.catch(err => {
    	console.error('ERROR:', err);
      	res.status(400).send(err);
  	});
 
};
