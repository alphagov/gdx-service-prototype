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

  fetchById(id) {
    return this.requestsById[id];
  }

  fetchAllSummaries() {
    return Object.values(this.requestsById).map((r) => {
      return {
        id: r.id,
        requestingUser: r.requestingUser,
        datasetName: r.datasetName,
      };
    });
  }
}

class UserService {
  #usersById;

  constructor(users) {
    this.usersById = Object.fromEntries(users.map((u) => [u.name, u]));
  }

  fetchUserByName(userName) {
    return this.usersById[userName];
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
    description:
      "This is a dataset based on an event driven architecture which publishes events representing deaths",
    email: "support@example.com",
    department: "GRO",
    tags: ["events", "death"],
    sensitivity: "High",
    techRequirements: "Apache Kafka",
    legalOpsRequirements: "TBC",
    otherRequirements: "TBC",
  },
  {
    id: "debt-events",
    name: "Debt Events",
    description: "This is a dataset containing information about what you owe",
    email: "support@example.com",
    department: "HMRC",
    tags: ["events", "debt"],
    sensitivity: "Medium",
    techRequirements: "Apache Kafka",
    legalOpsRequirements: "TBC",
    otherRequirements: "TBC",
  },
  {
    id: "passport-office-api",
    name: "Passport Information",
    description: "Information about passport details.",
    email: "support@example.com",
    department: "Home Office",
    tags: ["api", "passport"],
    sensitivity: "Low",
    techRequirements: "JSON API",
    legalOpsRequirements: "TBC",
    otherRequirements: "TBC",
  },
]);

exports.users = new UserService([
  {
    name: "Charlie",
    department: "DWP",
  },
  {
    name: "Kartheek",
    department: "HMRC",
  },
]);
