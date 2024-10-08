import { icons } from "@/constants";
import { formatDate, formatTime } from "@/lib/utils";
import { Ride } from "@/types/type";
import { Image, Text, View } from "react-native";



export default function RideCard({ item }: { item: Ride }) {

    const {
        driver,
        destination_address,
        destination_latitude,
        destination_longitude,
        fare_price,
        origin_address,
        origin_latitude,
        origin_longitude,
        created_at,
        ride_time,
        payment_status
    } = item


    const mapUri = `https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=600&height=400&center=lonlat:${destination_longitude},${destination_latitude}&zoom=14&apiKey=${process.env.EXPO_PUBLIC_GEOAPIFY_KEY}`
    const mapUri2 = `https://maps.googleapis.com/maps/api/staticmap?center=${destination_latitude},${destination_longitude}&zoom=11&size=625x235&maptype=roadmap&key=${process.env.EXPO_PUBLIC_STATIC_MAPS_KEY}`
    console.log(mapUri2)
    return <View className="flex flex-row items-center justify-center bg-white p-1 rounded-lg shadow-sm shadow-neutral-300 mb-3">
        <View className="flex flex-col items-center justify-between p-3" >
            <View className="flex flex-row items-center justify-between" >
                <Image
                    source={{ uri: mapUri }}
                    className="w-[80px] h-[90px] rounded-lg"
                />
                <View className="flex flex-col mx-5 gap-y-5 flex-1" >
                    <View className="flex flex-row items-center gap-x-2" >
                        <Image
                            source={icons.point}
                            className="w-5 h-5"
                        />
                        <Text className="text-md font-JakartaMedium" numberOfLines={1}>
                            {origin_address}
                        </Text>
                    </View>
                    <View className="flex flex-row items-center gap-x-2" >
                        <Image
                            source={icons.to}
                            className="w-5 h-5"
                        />
                        <Text className="text-md font-JakartaMedium" numberOfLines={1} >
                            {destination_address}
                        </Text>
                    </View>

                </View>
            </View>

            <View className="flex flex-col w-full mt-5 bg-general-500 rounded-lg p-3 items-start justify-center" >
                <View className="flex flex-row items-center justify-between w-full mb-5" >
                    <Text className="text-md font-JakartaMedium text-gray-500" >
                        Date & Time
                    </Text>
                    <Text className="text-md font-JakartaMedium text-gray-500" >
                        {formatDate(created_at)} , {formatTime(ride_time)}
                    </Text>
                </View>
                <View className="flex flex-row items-center justify-between w-full mb-5" >
                    <Text className="text-md font-JakartaMedium text-gray-500" >
                      Driver
                    </Text>
                    <Text className="text-md font-JakartaMedium text-gray-500" >
                        {driver.first_name} {driver.last_name}
                    </Text>
                </View>
                <View className="flex flex-row items-center justify-between w-full mb-5" >
                    <Text className="text-md font-JakartaMedium text-gray-500" >
                      Car Seats
                    </Text>
                    <Text className="text-md font-JakartaMedium text-gray-500" >
                        {driver.car_seats}
                    </Text>
                </View>
                <View className="flex flex-row items-center justify-between w-full mb-5" >
                    <Text className="text-md font-JakartaMedium text-gray-500" >
                      Payment Status
                    </Text>
                    <Text className="text-md font-JakartaMedium text-gray-500" >
                        {payment_status}
                    </Text>
                </View>
            </View>
        </View>
    </View>


}