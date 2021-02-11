package it.unitn.sde.deliveryservice.constant;

public class ApiConstant {
   public static String CREATE_DELIVERY_REQUEST_API="/shipment/v1/deliveryRequest";
   public static String GET_DELIVERY_REQUEST_API="/shipment/v1/deliveryRequest";
   public static String ASSIGN_SHIPPER_API_0="/shipment/v1/deliveryRequest";
   public static String ASSIGN_SHIPPER_API_1="/shipper";
   public static String REJECT_DELIVERY_API_0="/shipment/v1/deliveryRequest";
   public static String REJECT_DELIVERY_API_1="/status";
   public static String GEOCODE_API="/maps/v1/geocode"; 
   public static String GET_CANDIDATE="/get-ranked-candidate"; 
   public static String CREATE_TRIP="/create-trip"; 
   public static String ADD_POINTS="/add-points";
   public static String SEND_NODELIVERY="/bot/v1/noDelivery";
   public static String SEND_REQUEST="/bot/v1/shippingRequest";
   public static String SEND_STATUS="/bot/v1/status";
}
