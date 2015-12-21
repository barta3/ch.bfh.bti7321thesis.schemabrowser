"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Subscription = (function () {
    function Subscription() {
        _classCallCheck(this, Subscription);
    }

    _createClass(Subscription, [{
        key: "subscribe",
        value: function subscribe(eventName) {
            var options = {
                timeout: 3,
                onSuccess: function onSuccess() {
                    console.log("mqtt subscribe to event " + eventName);

                    // TODO define topic
                    client2.subscribe('+/+/+/Temperature IR Bricklet/qC1/events/' + eventName, { qos: 1 });
                },
                onFailure: function onFailure(message) {
                    console.log("Connection failed: " + message.errorMessage);
                }
            };

            var client2 = new Paho.MQTT.Client(host, port, "eventSubscr_" + parseInt(Math.random() * 100, 10));
            client2.onConnectionLost = function (responseObject) {
                console.log("connection lost: " + responseObject.errorMessage);
            };
            client2.onMessageArrived = function (message) {
                console.log(message.destinationName, ' -- ', message.payloadString);
                $('#' + eventName).val(message.payloadString);
            };

            $.getScript('config.js', function () {
                console.log('mqtt connecting to event: ' + this.eventName + ' ...');
                client2.connect(options);
            });
        }
    }, {
        key: "unsubscribe",
        value: function unsubscribe() {
            // TODO: find a way to access client
            Subscription.client2.unsubscribe('#');
        }
    }]);

    return Subscription;
})();

//# sourceMappingURL=EventSubscription-compiled.js.map