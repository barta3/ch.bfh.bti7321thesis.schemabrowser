"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Subscription = (function () {
    function Subscription() {
        _classCallCheck(this, Subscription);

        this.client2 = new Paho.MQTT.Client(host, port, "eventSubscr_" + parseInt(Math.random() * 100, 10));
    }
    // TODO: topic specification

    _createClass(Subscription, [{
        key: "subscribe",
        value: function subscribe(deviceId, eventName) {
            var self = this;
            var options = {
                timeout: 3,
                onSuccess: function onSuccess(message) {
                    console.log("mqtt subscribe to event " + eventName);
                    var topic = '+/+/+/+/' + deviceId + '/events/' + eventName;
                    console.log(topic);
                    self.client2.subscribe(topic);
                },
                onFailure: function onFailure(message) {
                    console.log("Connection failed: " + message.errorMessage);
                }
            };

            this.client2.onConnectionLost = function (responseObject) {
                console.log("connection lost: " + responseObject.errorMessage);
            };
            this.client2.onMessageArrived = function (message) {
                console.log(message.destinationName, ' -- ', message.payloadString);
                $('#' + eventName).val(message.payloadString);
            };

            console.log('mqtt connecting ...');
            this.client2.connect(options);
        }
    }, {
        key: "unsubscribe",
        value: function unsubscribe(deviceId, eventName) {
            this.client2.unsubscribe('+/+/+/+/' + deviceId + '/events/' + eventName);
            this.client2.disconnect();
        }
    }]);

    return Subscription;
})();

//# sourceMappingURL=EventSubscription-compiled.js.map