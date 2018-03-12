// import express from 'express';


// class Event {
// 	static create(req, res) {
// 		const {id, venue, location, attendees, eventType, eventDate} = req.body;
// 		if (!location) {
// 			res.status(400).send({
// 				message: 'Location Cannot Be Empty!'
// 			})
// 		} else if(!venue) {
// 			res.status(400).send({
// 				message: 'Select a venue!'
// 			})
// 		} else if(!attendees) {
// 			res.status(400).send({
// 				message: 'Field Cannot Be Empty!'
// 			})
// 		} else if(!eventType) {
// 			res.status(400).send({
// 				message: 'Please Select Type Of Event'
// 			})
// 		} else if(!eventDate) {
// 			res.status(400).send({
// 				message: 'Please Choose a Date'
// 			})
// 		} else {
// 			global.events.push(req.body);

// 			return res.status(201).send({
// 				message: 'Successful',
// 				event: global.events,
// 				error: false
// 			});
// 		}
// 	}
// 	static getAll(req, res){
// 		return res.status(200).send({
// 			message: 'Successful',
// 			event: global.events
// 		});
// 	}
// 	static edit(req, res) {
// 		for (let i=0; i < global.events.length; i++){
// 			if(global.events[i].id === parseInt(req.params.id, 10)){
// 				global.events[i].location = req.body.location;
// 				global.events[i].venue = req.body.venue;
// 				global.events[i].eventDate = req.body.eventDate;
// 				return res.status(201).send({
// 					message: 'Update Successful',
// 					event: global.events
// 				});
// 			}
// 		}
// 		return res.status(404).send({
// 			message: 'Not Found'
// 		})
// 	}
// 	// static editEvent(req, res) {
// 	// 	const { id, location, venue, attendees, eventType, eventDate } = req.body;
// 	// 	let pos = global.events.findIndex(x => x.id === parseInt(req.params.id, 10)); {
// 	// 		//console.log(pos);
// 	// 		global.events[pos].location = req.body.location;
// 	// 		global.events[pos].eventDate = req.body.eventDate;
// 	// 		return res.status(201).send({
// 	// 			message: 'Update Successful',
// 	// 			event: global.events,
// 	// 			error: false
// 	// 		});
// 	// 	}
// 	// 	return res.status(404).send({
// 	// 		message: 'Not Found'
// 	// 	});
// 	// }
// 	static delete(req, res) {
// 		for (let i=0; i < global.events.length; i++) {
// 			global.events.splice(i, 1);
// 			return res.status(200).send({
// 				message: 'Event Deleted',
// 				event: global.events
// 		});
// 	}
// 		return res.status(404).send({
// 			message: 'Not Found',
// 			event: global.events
// 		})
// 	}
// }
// export default Event;