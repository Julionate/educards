import React, { useState, useCallback, useEffect } from "react";
import { Text, View, Dimensions, Pressable } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { ContributionGraph } from "react-native-chart-kit";
import dayjs from "dayjs";
import "dayjs/locale/es";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { getStats } from "../database/db";
import PointerLeft from "../../assets/icons/PointerLeft";
import PointerRight from "../../assets/icons/PointerRight";
dayjs.extend(utc);
dayjs.extend(timezone);

export const StatsView = () => {
  const screenWidth = Dimensions.get("window").width;
  const [statsData, setStatsData] = useState([]);
  const [endDate, setEndDate] = useState(
    dayjs().add(1, "month").startOf("day").toDate()
  );
  const [numDays, setNumDays] = useState(99);

  const fetchData = async () => {
    const statsArray = await getStats();

    const formattedStats = statsArray.map((item) => ({
      date: dayjs(item.date).tz().startOf("day").format("YYYY-MM-DD"),
      count: item.count || 1,
    }));

    setStatsData(statsArray);
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
      return () => {
        setStatsData([]);
      };
    }, [])
  );

  useEffect(() => {
    fetchData();
  }, [endDate, numDays]);

  const loadPreviousPeriod = () => {
    setEndDate((prevDate) =>
      dayjs(prevDate).subtract(numDays, "day").startOf("day").toDate()
    );
  };

  const loadNextPeriod = () => {
    setEndDate((prevDate) =>
      dayjs(prevDate).add(numDays, "day").startOf("day").toDate()
    );
  };

  const Buttons = ({ text, action, type }) => {
    style = "w-8 h-8 fill-white -mx-2.5";
    return (
      <Pressable onPress={action}>
        <View className="flex flex-row p-2 gap-2 justify-center items-center h-12 w-28 rounded-xl bg-sky-400">
          {type === "left" ? <PointerLeft className={style} /> : null}
          <Text className="text-base font-medium text-white">{text}</Text>
          {type === "right" ? <PointerRight className={style} /> : null}
        </View>
      </Pressable>
    );
  };

  return (
    <View className="p-5">
      <Text className="text-2xl mb-2 font-medium text-center">
        Tus Estadísticas
      </Text>
      {statsData.length > 0 ? (
        <>
          <Text className="text-center text-sky-400 font-bold text-lg">
            {endDate.getFullYear()}
          </Text>
          <ContributionGraph
            values={statsData}
            endDate={dayjs(endDate).format("YYYY-MM-DD")}
            numDays={numDays}
            width={screenWidth - 40}
            onDayPress={({ count, date }) => console.log(count, date)}
            height={220}
            chartConfig={{
              backgroundColor: "#e26a00",
              backgroundGradientFrom: "#38BDF8",
              backgroundGradientTo: "#38BDF8",
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            }}
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        </>
      ) : (
        <Text style={{ marginTop: 20 }}>No hay datos para mostrar</Text>
      )}
      <View className="flex flex-row justify-evenly pt-2">
        <Buttons text="Anterior" action={loadPreviousPeriod} type="left" />
        <Buttons text="Siguiente" action={loadNextPeriod} type="right" />
      </View>
    </View>
  );
};
