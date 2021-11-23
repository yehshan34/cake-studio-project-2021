import moment from "moment";
import {
    Title,
} from '../styles/AppointmentDetailsStyles';

const AppointmentDetails = ({selectedEvent}) => {
    const startDateTime = selectedEvent.start;
    const endDateTime = selectedEvent.end;
    const formattedStartDate = moment(startDateTime).utc().format("DD MMMM YYYY");
    const formattedStartTime = moment(startDateTime).local().format("hh:mm a");
    const formattedEndTime = moment(endDateTime).local().format("hh:mm a");

    return (
        <div>
        {selectedEvent ? (
            <div>
            <Title>{selectedEvent.title}</Title>
            {/* <div>姓名： {selectedEvent.name}</div> */}
            <div>上課總人數： {selectedEvent.person}</div>
            {/* <div>性別： {selectedEvent.gender}</div> */}
            <div>日期： {formattedStartDate}</div>
            <div>開始時間： {formattedStartTime}</div>
            <div>結束時間： {formattedEndTime}</div>
            </div>
        ) : (
            <div>抱歉，登記失敗，請重新申請登記！</div>
        )}
        </div>
    );
}
 
export default AppointmentDetails;