/// <reference path="../../references.ts" />

describe('Register Controller Specs', () => {
  var stat: Model.Statistic

  beforeEach(angular.mock.module('typewritingApp'));

  beforeEach(() => {
    jasmine.addCustomEqualityTester((first, second) => {
      return angular.equals(first, second);
    });
  });
  
  beforeEach(() => {
    stat = new Model.Statistic();
  });

  it('should increase to correct presses', () => {
    spyOn(stat, "increaseNofCorrectKeyPresses").and.callThrough();

    stat.increaseNofCorrectKeyPresses();

    expect(stat.getNofCorrectKeyPresses()).toEqual(1);
  });

  it('should increase to mistakes', () => {
    spyOn(stat, "increaseNofMistakes").and.callThrough();

    stat.increaseNofMistakes();

    expect(stat.getNofMistakes()).toEqual(1);
  });

  it('should sum the mistakes and corrects to get the total', () => {
    spyOn(stat, "increaseNofMistakes").and.callThrough();
    spyOn(stat, "increaseNofCorrectKeyPresses").and.callThrough();

    stat.increaseNofCorrectKeyPresses();
    stat.increaseNofMistakes();

    expect(stat.getNofKeyPresses()).toEqual(2);
  });

  it('should divide the correct with the total and multip by 100 to get accuracy', () => {
    spyOn(stat, "increaseNofCorrectKeyPresses").and.callThrough();

    stat.increaseNofCorrectKeyPresses();

    expect(stat.getAccuracy()).toEqual(100);
  });

  it('should calculate the speed (total / (time/1000)) * (60000/time)', () => {
    spyOn(stat, "increaseNofCorrectKeyPresses").and.callThrough();
    spyOn(stat, "setTime").and.callThrough();
    spyOn(stat, "calculateTypingSpeed").and.callThrough();

    stat.increaseNofCorrectKeyPresses()
    stat.setTime(1000);
    stat.calculateTypingSpeed(1000)

    expect(stat.getTypingSpeed()).toEqual(60);
  });

  it('should give divide by 1000 to get in secs', () => {
    spyOn(stat, "setTime").and.callThrough();

    stat.setTime(1000);

    expect(stat.getTimeInSeconds()).toEqual(1);
  });
  
    it('should give back the set time', () => {
    spyOn(stat, "setTime").and.callThrough();

    stat.setTime(1000);

    expect(stat.getTime()).toEqual(1000);
  });
});