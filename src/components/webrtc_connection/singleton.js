import rtc_connection from './userTest';

export var Singleton = (function () {
    var instance;
  
    function createInstance() {
      var object = new rtc_connection();
      return object;
    }
  
    return {
      getInstance: function () {
        if (!instance) {
          instance = createInstance();
        }
        return instance;
      }
    };
  })();