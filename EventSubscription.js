class Subscription {

    constructor() {
        this.client2 = new Paho.MQTT.Client(host, port, "eventSubscr_" + parseInt(Math.random() * 100, 10));
    }
    // TODO: topic specification

    subscribe(deviceId, eventName) {
        var self = this;
        var options = {
            timeout: 3,
            onSuccess: function (message) {
                console.log("mqtt subscribe to event " + eventName);
                var topic = '+/+/+/+/' + deviceId + '/events/' + eventName;
                console.log(topic);
                self.client2.subscribe(topic);
            },
            onFailure: function (message) {
                console.log("Connection failed: " + message.errorMessage);
            }
        };

        this.client2.onConnectionLost = function (responseObject) {
            console.log("connection lost: " + responseObject.errorMessage);
        };
        this.client2.onMessageArrived = function (message) {
            console.log(message.destinationName, ' -- ', message.payloadString);
            ($('#' + eventName)).val(message.payloadString);
        };

        console.log('mqtt connecting ...');
        this.client2.connect(options);

    }

    unsubscribe(deviceId, eventName) {
        this.client2.unsubscribe('+/+/+/+/' + deviceId + '/events/' + eventName);
        this.client2.disconnect();
    }
}