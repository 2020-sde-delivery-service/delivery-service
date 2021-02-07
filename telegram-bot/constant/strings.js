module.exports = {
    //general
    CANCEL_BUTTON: '❌ Cancel',
    ACCEPT_BUTTON: '✅ Accept',
    CANCEL_MESSAGE: '❌ Operation canceled',
    ERROR_MESSAGE: '❌ Error',
    NOSHIPPER_MESSAGE: '❌ You are not a shipper',

    //becomeShipperWizard
    BSW_ASK_MESSAGE: '📦 Are you sure to become a shipper?',
    BSW_ACCEPT_MESSAGE: '✅ Now you are a shipper',

    //deliveryConfirmWizard
    DCW_ACCEPT_MESSAGE: '✅ Delivery confirmed',
    DCW_SHIPMENT_MESSAGE: '📦 Shipments',
    DCW_CONFIRM_MESSAGE: '📦 Confirm delivery for shipment',
    DCW_RECAP_MESSAGE: (shipment) => '🆔 Shipment: ' + shipment.shipment + '\n📍 Pickup address: ' + shipment.pickup + '\n📍 Destination address: ' + shipment.delivery + '\n☎️ Phone number: ' + shipment.phone + '\n#️⃣ Number of packages: ' + shipment.quantity + '\n⚖️ Weight: ' + shipment.weight + "\n",

    //deliveryWizard
    DW_NEXT_BUTTON: '➡️ Next',
    DW_ACCEPT_MESSAGE: '✅ Delivery accepted',
    DW_DELIVERY_REQUEST: '📦 New delivery request',
    DW_START_MESSAGE: '📍 Type pickup address:',
    DW_DESTINATION_MESSAGE: '📍 Type destination address:',
    DW_PHONE_MESSAGE: '☎️ Type phone number:',
    DW_QUANTITY_MESSAGE: '#️⃣ Type the number of packages:',
    DW_WEIGHT_MESSAGE: '⚖️ Type the weight [Kg]:',
    DW_RECAP_MESSAGE: (start_address, destination_address, phone_number, quantity, weight) => '📦 New delivery request\n\n📍 Pickup address: ' + start_address + '\n📍 Destination address: ' + destination_address + '\n☎️ Phone number: ' + phone_number + '\n#️⃣ Number of packages: ' + quantity + '\n⚖️ Weight: ' + weight + '\n\nProceed?',


    //pickupConfirmWizard
    PCW_ACCEPT_MESSAGE: '✅ Pickup confirmed',
    PCW_SHIPMENT_MESSAGE: '📦 Shipments',
    PCW_CONFIRM_MESSAGE: '📦 Confirm pickup for shipment',
    PCW_RECAP_MESSAGE: (shipment) => '🆔 Shipment: ' + shipment.shipment + '\n📍 Pickup address: ' + shipment.pickup + ',\n📍 Destination address: ' + shipment.delivery + '\n☎️ Phone number: ' + shipment.phone + '\n#️⃣ Number of packages: ' + shipment.quantity + '\n⚖️ Weight: ' + shipment.weight + "\n",

    //status
    SHIPMENT_MESSAGE: '📦 Shipments',
    S_RECAP_MESSAGE: (shipment) => '🆔 Shipment: ' + shipment.shipment + '\n📍 Pickup address: ' + shipment.pickup + '\n📍 Destination address: ' + shipment.delivery + '\n☎️ Phone number: ' + shipment.phone + '\n#️⃣ Number of packages: ' + shipment.quantity + '\n⚖️ Weight: ' + shipment.weight + '\nℹ️ Status: ' + shipment.status + '\n',

    //trip
    T_TRIP_MESSAGE: '🗺️ Trip',
    T_RECAP_MESSAGE: (entry) => '📍 Address: ' + entry.address + '\n📦 Action: ' + entry.action + '\n🆔 Shipment: ' + entry.shipment + "\n",

    //botController
    BC_ASK_MESSAGE: '📦 New shipment available',
    BC_STATUS_MESSAGE: '📦 Shipment status update',
    BC_ACCEPT_MESSAGE: '✅ You accepted the shipment',
    BC_REJECT_MESSAGE: '❌ You rejected the shipment',
    BC_RECAP_MESSAGE: (shipment) => '🆔 Shipment: ' + shipment.shipment + '\n📍 Pickup address: ' + shipment.pickup + '\n📍 Destination address: ' + shipment.delivery + '\n☎️ Phone number: ' + shipment.phone + '\n#️⃣ Number of packages: ' + shipment.quantity + '\n⚖️ Weight: ' + shipment.weight + "\n",

}