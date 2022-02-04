class DataRequestService {
  #requestsById;
  #requestCount;

  constructor() {
    this.requestCount = 0;
    this.requestsById = {};
  }

  createRequest(dataReq) {
    const requestId = this.requestCount;
    this.requestsById[requestId] = { id: requestId, ...dataReq };
    this.requestCount += 1;
  }

  fetchAllSummaries() {
    return Object.values(this.requestsById).map((r) => {
      //TODO: Dept, dataset name and date?
      return { id: r.id, requestingUser: r.requestingUser };
    });
  }
}

class CatalogueService {
  #datasetsById;

  constructor(datasets) {
    this.datasetsById = Object.fromEntries(datasets.map((d) => [d.id, d]));
  }

  fetchById(id) {
    return this.datasetsById[id];
  }

  fetchAllSummaries() {
    return Object.values(this.datasetsById).map((d) => {
      return { id: d.id, name: d.name };
    });
  }

  fetchCount() {
    return Object.keys(this.datasetsById).length;
  }
}
exports.dataRequests = new DataRequestService();

exports.catalogue = new CatalogueService([
  {
    id: "death-events",
    name: "Death Events",
    description: "About death",
    email: "support@example.com",
    department: "GRO",
    tags: ["events", "death"],
  },
  {
    id: "debt-events",
    name: "Debt Events",
    description: "About what you owe",
    email: "support@example.com",
    department: "HMRC",
    tags: ["events", "debt"],
  },
  {
    id: "passport-office-api",
    name: "Passport Information",
    description: "Information about passport details.",
    email: "support@example.com",
    department: "Home Office",
    tags: ["api", "passport"],
  },
]);
