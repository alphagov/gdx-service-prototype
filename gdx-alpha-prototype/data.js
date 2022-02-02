class DatasetService  {

    #datasetsById;

    constructor(datasets) {
        this.datasetsById = Object.fromEntries(datasets.map(d=> [d.id, d]));
    }

    fetchById(id) {
	return this.datasetsById[id]
    }

    fetchAllSummaries() {
        //TODO: Only return a summary
	return Object.values(this.datasetsById).map(d => d);
    }

    fetchCount() {
	return Object.keys(this.datasetsById).length;
    }
}

exports.datasets = new DatasetService([
   {
        id: "death-events",
        name: "Death Events",
        description: "Some description"
   },
   {
        id: "beachball-licences",
        name: "Beachball Licences",
        description: "Some description"
   },
]);

