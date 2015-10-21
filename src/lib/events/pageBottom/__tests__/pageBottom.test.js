'use strict';
describe('pageBottom event type', function() {
  var delegate;
  var documentSpy;
  var injector;

  beforeEach(function() {
    documentSpy = jasmine.createSpyObj('document', ['addEventListener']);
    documentSpy.location = "http://somelocation.com";

    injector = require('inject!../pageBottom');
  });

  it('triggers rule when _satellite.pageBottom() is called', function() {
    delegate = injector({
      document: documentSpy
    });

    var trigger = jasmine.createSpy();
    delegate({}, trigger);
    expect(trigger.calls.count()).toBe(0);

    _satellite.pageBottom();

    expect(trigger.calls.count()).toBe(1);

    var call = trigger.calls.mostRecent();
    expect(call.args[0].type).toBe('pagebottom');
    expect(call.args[0].target).toBe("http://somelocation.com");
    expect(call.args[1]).toBe("http://somelocation.com");
  });

  it('triggers rule on DOMContentLoaded if _satellite.pageBottom() is not called', function() {
    var triggerPageBottomCallback;
    documentSpy.addEventListener.and.callFake(function(event, callback) {
      triggerPageBottomCallback = callback;
    });

    delegate = injector({
      document: documentSpy
    });

    var trigger = jasmine.createSpy();

    delegate({}, trigger);
    expect(trigger.calls.count()).toBe(0);

    triggerPageBottomCallback();

    expect(trigger.calls.count()).toBe(1);

    var call = trigger.calls.mostRecent();
    expect(call.args[0].type).toBe('pagebottom');
    expect(call.args[0].target).toBe("http://somelocation.com");
    expect(call.args[1]).toBe("http://somelocation.com");
  });
}); 
