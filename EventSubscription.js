class Subscription {

    constructor() {
        this.client2 = new Paho.MQTT.Client(host, port, "eventSubscr_" + parseInt(Math.random() * 100, 10));
    }
    // TODO: topic specification

    subscribe(eventName) {
        var self = this;
        var options = {
            timeout: 3,
            onSuccess: function (message) {
                console.log("mqtt subscribe to event " + eventName);
                self.client2.subscribe('+/+/+/Temperature IR Bricklet/qC1/events/' + eventName);
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


        console.log('mqtt connecting to event: ' + this.eventName + ' ...');
        this.client2.connect(options);

    }

    unsubscribe(eventName) {
        this.client2.unsubscribe('+/+/+/Temperature IR Bricklet/qC1/events/' + eventName);
        this.client2.disconnect();
    }
}