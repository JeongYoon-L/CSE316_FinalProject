const regionSchema = new Schema(
	{
		_id: {
			type: ObjectId,
			required: true
		},
		id: {
			type: Number,
			required: true
		},
		name: {
			type: String,
			required: true
		},
		capital: {
			type: String,
			required: true
		},
		leader: {
			type: String,
			required: true
		},
		Flag: {
			type: photo,
			required: true
		},
        parentRegion: { // ParentRegion's unique ID
			type: String,
			required: true
		},
        landmark: { //each regions's landmark
			type: [String],
			required: true
		}
	}
);