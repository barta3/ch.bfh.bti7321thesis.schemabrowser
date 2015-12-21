class Subscription {


    subscribe(eventName) {
        var options = {
            timeout: 3,
            onSuccess: function () {
                console.log("mqtt subscribe to event " + eventName);

                // TODO define topic
                client2.subscribe('+/+/+/Temperature IR Bricklet/qC1/events/' + eventName, {qos: 1});
            },
            onFailure: function (message) {
                console.log("Connection failed: " + message.errorMessage);
            }
        };

        var client2 = new Paho.MQTT.Client(host, port, "eventSubscr_" + parseInt(Math.random() * 100, 10));
        client2.onConnectionLost = function (responseObject) {
            console.log("connection lost: " + responseObject.errorMessage);
        };
        client2.onMessageArrived = function (message) {
            console.log(message.destinationName, ' -- ', message.payloadString);
            ($('#' + eventName)).val(message.payloadString);
        };


        $.getScript('config.js', function () {
            console.log('mqtt connecting to event: ' + this.eventName + ' ...');
            client2.connect(options);
        });
    }

    unsubscribe() {
        // TODO: find a way to access client
        Subscription.client2.unsubscribe('#');
    }


}