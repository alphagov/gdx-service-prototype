class CatalogueService {
    
    constructor(dataItems) {
        this.dataItems = Object.fromEntries(dataItems.map(d => [d.id, d]));
    }

    fetchById(id) {
        return this.dataItems[id]
    }

    fetchAllSummaries() {
        //TODO: Only return a summary
        return Object.values(this.dataItems).map(d => d);
    }

    fetchCount() {
        return Object.keys(this.dataItems).length;
    }
}

exports.catalogue = new CatalogueService([
    {
        id: "death-events",
        name: "Death Events",
        description: "About death",
        email: "support@example.com",
        department:"GRO",
        tags: ["events", "death"]
    },
    {
        id: "debt-events",
        name: "Debt Events",
        description: "About what you owe",
        email: "support@example.com",
        department:"HMRC",
        tags: ["events", "debt"]
    },
    {
        id: "passport-office-api",
        name: "Passport Information",
        description: "Information about passport details.",
        email: "support@example.com",
        department:"HOME OFFICE",
        tags: ["api", "passport"]
    }
]);

