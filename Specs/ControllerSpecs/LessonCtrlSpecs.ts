/// <reference path="../../references.ts" />

describe('Lesson Controller Specs', () => {
  var lessonCtrl: Controllers.LessonCtrl;
  var location: angular.ILocationService;
  var $httpBackend: angular.IHttpBackendService;
  var lessonService;
  var scope;
  var rootScope: angular.IRootScopeService;

  beforeEach(angular.mock.module('typewritingApp'));

  beforeEach(() => {
    jasmine.addCustomEqualityTester((first, second) => {
      return angular.equals(first, second);
    });


  });

  beforeEach(() => inject(($location, $rootScope: angular.IRootScopeService, LessonService) => {
    location = $location;
    lessonService = LessonService;
    location.path('/lesson');
    location.search('id', 1);
    scope = $rootScope.$new();
    rootScope = $rootScope;
    lessonCtrl = new Controllers.LessonCtrl(location, scope, LessonService);
    lessonCtrl.statistic = new Model.Statistic();
  }));

  beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('/api/lessons/1').respond(
      {
        "id": 1,
        "name": "Lesson 1",
        "text": "Text"
      }
    );
    $httpBackend.expectGET('/api/auth/sessions').respond("");
    $httpBackend.flush();
  }));

  it('should fetch lesson details', () => {
    expect(lessonCtrl.lesson).toEqual(
      {
        "id": 1,
        "name": "Lesson 1",
        "text": "Text"
      }
    );
  });

  it('should modify the statistic', () => {
    var e = jasmine.createSpyObj('e', ['preventDefault']);
    spyOn(lessonCtrl, "keyPressHandler").and.callThrough();
    spyOn(lessonCtrl.statistic, "increaseNofCorrectKeyPresses");
    spyOn(lessonCtrl.statistic, "increaseNofMistakes");

    e.which = 84; // T
    lessonCtrl.keyPressHandler(e);
    e.which = 54; // !T
    lessonCtrl.keyPressHandler(e);

    expect(lessonCtrl.statistic.increaseNofCorrectKeyPresses).toHaveBeenCalled();
    expect(lessonCtrl.statistic.increaseNofMistakes).toHaveBeenCalled();
    expect(lessonCtrl.textToBeType).toEqual("ext");
  });

  it('should broadcast a timer-stop event at the last char', () => {
    var e = jasmine.createSpyObj('e', ['preventDefault']);
    spyOn(lessonCtrl, "keyPressHandler").and.callThrough();
    spyOn(lessonCtrl.statistic, "increaseNofCorrectKeyPresses");
    spyOn(lessonCtrl.scope, "$broadcast").and.callThrough();
    lessonCtrl.lesson.text = "T";

    e.which = 84; // T
    lessonCtrl.keyPressHandler(e);

    expect(lessonCtrl.statistic.increaseNofCorrectKeyPresses).toHaveBeenCalled();
    expect(lessonCtrl.scope.$broadcast).toHaveBeenCalledWith('timer-stop');
  });

  it('should set the time when the timer stops', () => {
    spyOn(lessonCtrl.statistic, "setTime").and.callThrough();
    spyOn(lessonCtrl.statistic, "calculateTypingSpeed");    
    spyOn(rootScope, "$broadcast").and.callThrough();
    spyOn(lessonCtrl.scope, "$on").and.callThrough();
    
    rootScope.$broadcast('timer-stopped', {millis: 1000});
    
    expect(lessonCtrl.statistic.setTime).toHaveBeenCalledWith(1000);
    expect(lessonCtrl.statistic.calculateTypingSpeed).toHaveBeenCalledWith(1000);
    expect(lessonCtrl.statistic.getTime()).toEqual(1000);    
  });
}); 
