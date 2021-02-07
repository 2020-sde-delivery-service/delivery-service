package it.unitn.sde.tripservice.utils;

public  class Utils {
    public static double [] covertStringLocationToNumber(String location){
        String [] tmp=location.split(",");
        double [] res =new double[2];
        res[0]=Double.parseDouble(tmp[0]);
        res[1]=Double.parseDouble(tmp[1]);
        return res;
    }
}
