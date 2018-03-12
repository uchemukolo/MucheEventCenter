// global.centers = [{
// 	id: '1',
// 	name: 'Diamonds Center',
// 	address: '1 Chevron drive, Lekki',
// 	description: 'Diamonds Events Center and All brings a fresh and innovative approach to event venue services.',
// 	capacity: '200',
// 	amenities: 'Generator, AC, parking, music, DJ, catering'
// }
// ];

// class Center {
// 	static add (req, res ){
// 		const{ id, name, address, description, capacity, amenities} = req.body;
// 		if (!name){
// 			res.status(400).send({
// 				message: 'Please add new center name!'
// 			})
// 		} else if (!address){
// 			res.status(400).send({
// 				message: 'Please add address!'
// 			})
// 		} else if(!description){
// 			res.status(400).send({
// 				message: 'Please provide description!'
// 			})
// 		} else if(!capacity){
// 			res.status(400).send({
// 				message: 'Please stste the capacity of the new Center!'
// 			})
// 		} else if(!amenities){
// 			res.status(400).send({
// 				message: 'Please provde list of amenities'
// 			})
// 		} else {
// 			global.centers.push(req.body);
// 			return res.status(201).send({
// 				message: 'Center Added Successfully',
// 				centers: global.centers
// 			})
// 		}
// 	}
// 	static getAll(req, res ){
// 		return res.status(200).send({
// 			message: 'Successful',
// 			centers: global.centers

// 		})
// 	}
// 	static getOne(req, res ){
// 		for(let i=0; i < global.centers.length; i++){
// 			if(global.centers[i].id === parseInt(req.params.id, 10)){
// 				global.centers.push(i, 1);
// 				return res.status(200).send({
// 					message: 'successful',
// 					centers: global.centers
// 				})
// 			}
// 		}
// 	}
// 	static modify(req, res ){
// 		for(let i=0; i<global.centers.length; i++){
// 			if(global.centers[i].id === parseInt(req.params.id, 10))	{
// 				global.centers[1].name = req.body.name;
// 				global.centers[i].address = req.body.address;
// 				global.centers[i].description = req.body.description;
// 				global.centers[i].capacity = req.body.capacity;
// 				global.centers[i].amenities = req.body.amenities;
// 				return res.status(201).send({
// 					message: 'Center Modified'
// 				})
// 			}
// 		}
// 		return res.status(404).send({
// 			message: 'Not Found',
// 			centers: global.centers
// 		})
// 	}
// }
// export default Center;