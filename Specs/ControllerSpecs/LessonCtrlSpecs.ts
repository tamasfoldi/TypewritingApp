/// <reference path="../../references.ts" />

describe('Lesson Controller Specs', () => {
  var lessonCtrl: Controllers.LessonCtrl;
  var location: angular.ILocationService;
  var $httpBackend: angular.IHttpBackendService;
  var lessonService;
  var scope;

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
    lessonCtrl = new Controllers.LessonCtrl(location, scope, LessonService);
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
    var e = jasmine.createSpyObj('e', [ 'preventDefault' ]);
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
    //expect(lessonCtrl.typedText).toEqual("T");
    // lessonCtrl.keyPressHandler({which: 101});
    // lessonCtrl.keyPressHandler({which: 120});
    // lessonCtrl.keyPressHandler({which: 116});
    // expect(lessonCtrl.typedText).toEqual("Text");
    // expect(lessonCtrl.textareaIsDisabled)
  });
  
  it('should broadcast a timer-stop event at the last char', () => {
    var e = jasmine.createSpyObj('e', [ 'preventDefault' ]);
    spyOn(lessonCtrl, "keyPressHandler").and.callThrough();
    spyOn(lessonCtrl.statistic, "increaseNofCorrectKeyPresses");
    spyOn(lessonCtrl.scope, "$broadcast").and.callThrough();
    lessonCtrl.lesson.text = "T";
    
    e.which = 84; // T
    lessonCtrl.keyPressHandler(e);
    
    expect(lessonCtrl.statistic.increaseNofCorrectKeyPresses).toHaveBeenCalled();
    expect(lessonCtrl.scope.$broadcast).toHaveBeenCalledWith('timer-stop');
  });
}); 
