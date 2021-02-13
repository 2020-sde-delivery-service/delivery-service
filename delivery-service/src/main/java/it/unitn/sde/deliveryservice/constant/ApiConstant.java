package it.unitn.sde.deliveryservice.constant;

public class ApiConstant {
   public static String CREATE_DELIVERY_REQUEST_API="/api/v1/shipments";
   public static String GET_DELIVERY_REQUEST_API="/api/v1/shipments";
   public static String ASSIGN_SHIPPER_API_0="/api/v1/shipments";
   public static String ASSIGN_SHIPPER_API_1="/shipper";
   public static String REJECT_DELIVERY_API_0="/api/v1/shipments";
   public static String REJECT_DELIVERY_API_1="/status";
   public static String GEOCODE_API="/api/v1/geocode";
   public static String GET_CANDIDATE="/get-ranked-candidate"; 
   public static String CREATE_TRIP="/create-trip";
   public static String ADD_POINTS="/add-points";
   public static String SEND_NODELIVERY="/api/v1/message/no-delivery";
   public static String SEND_REQUEST="/api/v1/message/shipping-request";
   public static String SEND_STATUS="/api/v1/message/status";
}
