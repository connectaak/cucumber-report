const { expect } = require("chai");

export function validateCucumberData(cucumberData) {
  expect(cucumberData).to.be.an("array").with.lengthOf.at.least(1);

  const feature = cucumberData[0];
  validateFeature(feature);

  const scenarios = feature.elements;
  scenarios.forEach(validateScenario);
}

function validateFeature(feature) {
  expect(feature).to.have.property("id");
  expect(feature).to.have.property("keyword").to.equal("Feature");
  expect(feature).to.have.property("name");
  // Add more assertions as needed for feature
}

function validateScenario(scenario) {
  expect(scenario).to.have.property("id");
  expect(scenario).to.have.property("keyword").to.equal("Scenario");
  expect(scenario).to.have.property("name");
  const steps = scenario.steps;
  steps.forEach(validateStep);
  // Add more assertions as needed for scenario
}

function validateStep(step) {
  expect(step).to.have.property("keyword");
  expect(step).to.have.property("name");
  expect(step).to.have.property("result");
  expect(step.result).to.have.property("status");
  // Add more assertions as needed for step
}
