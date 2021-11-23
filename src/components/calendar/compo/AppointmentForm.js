import {useState, useEffect} from 'react';
import {useForm} from "react-hook-form";
import DatePicker from 'react-date-picker';
import TimeRangePicker from '@wojtekmaj/react-timerange-picker';
import moment from 'moment';
import {useDispatch} from 'react-redux';
import {add_appointment} from '../redux/appointment/appointmentActions';
import uuid from 'react-uuid';
import {
    FormWrapper,
    Header,
    ListItem,
    ListContainer,
    AddButton,
    Input,
    Select,
    Label,
    Option
} from '../styles/AppointFormStyles';
// import { GenderContainer } from '../styles/AppointFormStyles';

const AppointmentForm = ({closeModal}) => {
    // States
    const [startDateTime, setStartDateTime] = useState(new Date());
    const [endDateTime, setEndDateTime] = useState(new Date());

    //Assign useDispatch hook to a variable
    const dispatch = useDispatch();

    // useForm handler
    const { register, handleSubmit, reset } = useForm();

    // Date Picker State
    const [selectedDate, onChangeDate] = useState(new Date());

    // Timerange Picker State
    const [selectedTime, onChangeTime] = useState(['10:00', '11:00']);

    // Add start and end date time when state changes
    useEffect(() => {
        let formattedDate = moment(selectedDate).format("YYYY-MM-DD");
        setStartDateTime(formattedDate+"T"+selectedTime[0]+":00");
        setEndDateTime(formattedDate+"T"+selectedTime[1]+":00");
    }, [selectedDate, selectedTime]);


    // onSubmit Function
    const onSubmit = (data) => {
        const appointmentInfo = {
            ...data,
            start: startDateTime,
            end: endDateTime,
            id: uuid(),
        };
        dispatch(add_appointment(appointmentInfo))
        .then(() => {
            console.log("form data: ", appointmentInfo);
            // Check with localstorage data
            if("appointments" in localStorage) {
                let localStorageArray = JSON.parse(localStorage.getItem('appointments'));
                localStorageArray.push(appointmentInfo);
                localStorage.setItem('appointments', JSON.stringify(localStorageArray));
            }
            else {
                let newArray = [];
                newArray.push(appointmentInfo);
                localStorage.setItem("appointments", JSON.stringify(newArray));
            }
            // Reset react-hook-form states
            reset();
            // Reset date picker and time picker
            setStartDateTime(new Date());
            setEndDateTime(new Date());
            // Close modal
            closeModal();
        })
        .catch((error) => {
            console.log(`Error getting data: ${error}`);
            // Close modal
            closeModal();
        });
    };

    return (
        <FormWrapper>
            <Header>課程預約申請表</Header>
            <form onSubmit={handleSubmit(onSubmit)}>
                <ListContainer>
                <ListItem>
                        <Label>姓名</Label>
                        <Input
                            name="name"
                            type="text"
                            placeholder=""
                            required
                            {...register("name", {
                                required: true,
                                maxLength: 10,
                            })}
                        />
                    </ListItem>
                    <ListItem>
                        <Label>選擇課程</Label>
                        <Select
                            name="title"
                            component="select"
                            placeholder="您想預約的課程..."
                            required
                            {...register("title", {
                                required: true,
                                maxLength: 100,
                            })}
                            >
                            <Option>- - - - - - - - -</Option>
                            <Option>韓式裱花 [單日班]</Option>
                            <Option>韓式裱花 [全修證書班]</Option>
                            <Option>減糖和菓子擠花班</Option>
                            <Option>威化紙花 / 冷瓷土花班</Option>
                            <Option>俄羅斯刮花刀班</Option>
                            </Select>
                    </ListItem>
                    <ListItem>
                        <Label>常用信箱</Label>
                        <Input
                            name="email"
                            type="text"
                            placeholder=""
                            required
                            {...register("email", {
                                required: true,
                                maxLength: 45,
                            })}
                        />
                    </ListItem>
                    <ListItem>
                        <Label>上課總人數</Label>
                        <Input
                            name="person"
                            type="number"
                            required
                            {...register("person", {
                                required: true,
                                maxLength: 3,
                            })}
                        />
                    </ListItem>
                    {/* <ListItem>
                        <Label>性別</Label>
                        <GenderContainer>
                            <Input
                                type="radio"
                                id="male"
                                name="gender"
                                value="male"
                                required
                                {...register("gender")}
                            />
                            <Label htmlFor="male">男生</Label>
                            <Input
                                type="radio"
                                id="female"
                                name="gender"
                                value="female"
                                {...register("gender")}
                            />
                            <Label htmlFor="female">女生</Label>
                        </GenderContainer>
                    </ListItem> */}
                    <ListItem>
                        <Label>想上課日期</Label>
                            <DatePicker
                                onChange={onChangeDate}
                                value={selectedDate}
                                format="y-MM-d"
                            />
                    </ListItem>
                    <ListItem>
                        <Label>想上課的時間</Label>
                            <TimeRangePicker
                                onChange={onChangeTime}
                                value={selectedTime}
                            />
                    </ListItem>
                    <ListItem>
                      <Label>其他備註</Label>
                    <Input
                            name="text"
                            type="text"
                        />
                    </ListItem> 
                    <ListItem>
                        </ListItem>
                    <ListItem>
                    * 送出申請表後，老師將會在 1 天內寄送 e-mail 至您的信箱，請收信，
                    </ListItem> 
                    <ListItem>
                        並確認是否成功預約課程喔，收到信件、繳費完成，才算預約成功喔！
                    </ListItem> 
                    <ListItem>
                        <AddButton type="submit" className="send-request-button">送出預約申請</AddButton>
                    </ListItem>
                </ListContainer>
            </form>
        </FormWrapper>
    );
};

export default AppointmentForm;
