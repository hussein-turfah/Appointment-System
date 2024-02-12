import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createDoctorSchedule,
  getDoctorSchedules,
} from "../../actions/ScheduleActions";
import styles from "./styles/index.module.scss";

const ScheduleTable = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const doctorId = router.query.user;

  const [isChanged, setIsChanged] = useState(false);

  const user = useSelector(({ UserData }) => UserData.data);

  const originalSchedule = useSelector(
    ({ ScheduleData }) => ScheduleData.allSchedules
  );

  const [schedule, setSchedule] = useState(
    originalSchedule.data[originalSchedule.data.length - 1]?.weekdays
  );

  const handleStartTimeChange = (index, event) => {
    const newSchedule = schedule;
    newSchedule[index].startTime = event.target.value;
    setSchedule(newSchedule);
    setIsChanged(true);
  };

  const handleEndTimeChange = (index, event) => {
    const newSchedule = schedule;
    newSchedule[index].endTime = event.target.value;
    setSchedule(newSchedule);
    setIsChanged(true);
  };

  const createSchedule = useCallback(async () => {
    await dispatch(createDoctorSchedule(doctorId, schedule));
  }, [dispatch, doctorId, schedule]);

  useEffect(() => {
    if (user?.type === "doctor") {
      dispatch(getDoctorSchedules(user.id));
    }
  }, [dispatch, user?.type, user?.id]);

  // check user if not doctor, return to /calendar
  // useEffect(() => {
  //   if (user?.role !== "doctor") {
  //     router.push("/calendar");
  //   }
  // }, [user]);

  if (!originalSchedule.loaded)
    return (
      <div className={styles.logout}>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            router.push("/login");
          }}
        >
          Logout
        </button>
      </div>
    );
  else
    return (
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-20">
        <div className={styles.logout}>
          <button
            onClick={() => {
              localStorage.removeItem("token");
              router.push("/login");
            }}
          >
            Logout
          </button>
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Day
              </th>
              <th scope="col" className="px-6 py-3">
                Start Time
              </th>
              <th scope="col" className="px-6 py-3">
                End Time
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(schedule) &&
              schedule.map((day, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } border-b dark:bg-gray-800 dark:border-gray-700`}
                >
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {day.day}
                  </td>
                  <td className="px-6 py-4">
                    <input
                      type="time"
                      value={day.startTime}
                      onChange={(event) => {
                        handleStartTimeChange(index, event);
                      }}
                      className="border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <input
                      type="time"
                      value={day.endTime}
                      onChange={(event) => {
                        handleEndTimeChange(index, event);
                      }}
                      className="border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {isChanged && (
          <button
            onClick={() => {
              setIsChanged(false);
              createSchedule();
            }}
            className="btn btn-primary w-50 mx-auto mb-3 w-full border-2 bg-gray-500 text-white border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          >
            Save
          </button>
        )}
      </div>
    );
};

export default ScheduleTable;
