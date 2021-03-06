import * as React from 'react';
import {
  ViewState,
  EditingState,
  GroupingState,
  IntegratedEditing,
  IntegratedGrouping,
} from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  MonthView,
  WeekView,
  DayView,
  Appointments,
  Toolbar,
  DateNavigator,
  ViewSwitcher,
  AllDayPanel,
  AppointmentTooltip,
  AppointmentForm,
  GroupingPanel,
  Resources,
  ConfirmationDialog,
} from '@devexpress/dx-react-scheduler-material-ui';
import { connectProps } from '@devexpress/dx-react-core';
import { withStyles, makeStyles, fade } from '@material-ui/core/styles';
import { lightBlue, pink } from '@material-ui/core/colors';
import PriorityHigh from '@material-ui/icons/PriorityHigh';
import LowPriority from '@material-ui/icons/LowPriority';
import Lens from '@material-ui/icons/Lens';
import Event from '@material-ui/icons/Event';
import AccessTime from '@material-ui/icons/AccessTime';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import classNames from 'clsx';
import Axios from "axios";

const priorities = [
  { id: 1, text: '김정은', color: pink },
  { id: 2, text: '이예은', color: lightBlue }
];

const AllDayPanelMessage = {
  allDay : '매일',
};

const ConfirmationDialogMessage = {
  discardButton : '네',
  deleteButton : '네',
  cancelButton : '아니오',
  confirmDeleteMessage : '일정을 삭제하시겠습니까?',
  confirmCancelMessage : '수정된 작업을 취소하시겠습니까?',
};

const AppointmentFormMessage = {
  detailsLabel:'내용',
  allDayLabel:'매일',
  titleLabel:'제목',
  commitCommand:'저장',
  moreInformationLabel:'상세내용',
  repeatLabel:'반복 설정',
  notesLabel:'',
  never:'종료 안함',
  daily:'매일',
  weekly:'매주',
  monthly:'매달',
  yearly:'매년',
  repeatEveryLabel:'반복 주기',
  daysLabel:'일',
  endRepeatLabel:'반복 종료 시점',
  onLabel:'종료 횟수',
  afterLabel:'종료 날짜',
  occurrencesLabel:'회',
};

const grouping = [{
  resourceName: 'priorityId',
}];

const filterTasks = (items, priorityId) => items.filter(task => (
  !priorityId || task.priorityId === priorityId
));

const getIconById = (id) => {
  if (id === 1) {
    return LowPriority;
  }
  if (id === 2) {
    return Event;
  }
  return PriorityHigh;
};

const styles = theme => ({
  flexibleSpace: {
    margin: '0 auto 0 0',
  },
  prioritySelector: {
    marginLeft: theme.spacing(2),
    minWidth: 140,
    '@media (max-width: 500px)': {
      minWidth: 0,
      fontSize: '0.75rem',
      marginLeft: theme.spacing(0.5),
    },
  },
});
const usePrioritySelectorItemStyles = makeStyles(({ palette, spacing }) => ({
  bullet: ({ color }) => ({
    backgroundColor: color ? color[400] : palette.divider,
    borderRadius: '50%',
    width: spacing(2),
    height: spacing(2),
    marginRight: spacing(2),
    display: 'inline-block',
  }),
  prioritySelectorItem: {
    display: 'flex',
    alignItems: 'center',
  },
  priorityText: {
    '@media (max-width: 500px)': {
      display: 'none',
    },
  },
  priorityShortText: {
    '@media (min-width: 500px)': {
      display: 'none',
    },
  },
}));
const useTooltipContentStyles = makeStyles(theme => ({
  content: {
    padding: theme.spacing(3, 1),
    paddingTop: 0,
    backgroundColor: theme.palette.background.paper,
    boxSizing: 'border-box',
    width: '400px',
  },
  contentContainer: {
    paddingBottom: theme.spacing(1.5),
  },
  text: {
    ...theme.typography.body2,
    display: 'inline-block',
  },
  title: {
    ...theme.typography.h6,
    color: theme.palette.text.secondary,
    fontWeight: theme.typography.fontWeightBold,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'normal',
  },
  icon: {
    verticalAlign: 'middle',
  },
  contentItemIcon: {
    textAlign: 'center',
  },
  grayIcon: {
    color: theme.palette.action.active,
  },
  colorfulContent: {
    color: ({ color }) => color[300],
  },
  lens: {
    width: theme.spacing(4.5),
    height: theme.spacing(4.5),
    verticalAlign: 'super',
  },
  textCenter: {
    textAlign: 'center',
  },
  dateAndTitle: {
    lineHeight: 1.1,
  },
  titleContainer: {
    paddingBottom: theme.spacing(2),
  },
  container: {
    paddingBottom: theme.spacing(1.5),
  },
}));
const groupingStyles = ({ spacing }) => ({
  ...priorities.reduce((acc, priority) => ({
    ...acc,
    [`cell${priority.text.replace(' ', '')}`]: {
      backgroundColor: fade(priority.color[400], 0.1),
      '&:hover': {
        backgroundColor: fade(priority.color[400], 0.15),
      },
      '&:focus': {
        backgroundColor: fade(priority.color[400], 0.2),
      },
    },
    [`headerCell${priority.text.replace(' ', '')}`]: {
      backgroundColor: fade(priority.color[400], 0.1),
      '&:hover': {
        backgroundColor: fade(priority.color[400], 0.1),
      },
      '&:focus': {
        backgroundColor: fade(priority.color[400], 0.1),
      },
    },
  }), {}),
  icon: {
    paddingLeft: spacing(1),
    verticalAlign: 'middle',
  },
});

const DayViewTimeTableCell = withStyles(groupingStyles, { name: 'DayViewTimeTableCell' })(({
  groupingInfo, classes, ...restProps
}) => {
  const groupId = groupingInfo[0].id;
  return (
    <DayView.TimeTableCell
      className={classNames({
        [classes.cellLowPriority]: groupId === 1,
        [classes.cellMediumPriority]: groupId === 2,
        [classes.cellHighPriority]: groupId === 3,
      })}
      groupingInfo={groupingInfo}
      {...restProps}
    />
  );
});
const DayViewDayScaleCell = withStyles(groupingStyles, { name: 'DayViewDayScaleCell' })(({
  groupingInfo, classes, ...restProps
}) => {
  const groupId = groupingInfo[0].id;
  return (
    <DayView.DayScaleCell
      className={classNames({
        [classes.headerCellLowPriority]: groupId === 1,
        [classes.headerCellMediumPriority]: groupId === 2,
        [classes.headerCellHighPriority]: groupId === 3,
      })}
      groupingInfo={groupingInfo}
      {...restProps}
    />
  );
});
const WeekViewTimeTableCell = withStyles(groupingStyles, { name: 'WeekViewTimeTableCell' })(({
  groupingInfo, classes, ...restProps
}) => {
  const groupId = groupingInfo[0].id;
  return (
    <WeekView.TimeTableCell
      className={classNames({
        [classes.cellLowPriority]: groupId === 1,
        [classes.cellMediumPriority]: groupId === 2,
        [classes.cellHighPriority]: groupId === 3,
      })}
      groupingInfo={groupingInfo}
      {...restProps}
    />
  );
});
const WeekViewDayScaleCell = withStyles(groupingStyles, { name: 'WeekViewDayScaleCell' })(({
  groupingInfo, classes, ...restProps
}) => {
  const groupId = groupingInfo[0].id;
  return (
    <WeekView.DayScaleCell
      className={classNames({
        [classes.headerCellLowPriority]: groupId === 1,
        [classes.headerCellMediumPriority]: groupId === 2,
        [classes.headerCellHighPriority]: groupId === 3,
      })}
      groupingInfo={groupingInfo}
      {...restProps}
    />
  );
});
const AllDayCell = withStyles(groupingStyles, { name: 'AllDayCell' })(({
  groupingInfo, classes, ...restProps
}) => {
  const groupId = groupingInfo[0].id;
  return (
    <AllDayPanel.Cell
      className={classNames({
        [classes.cellLowPriority]: groupId === 1,
        [classes.cellMediumPriority]: groupId === 2,
        [classes.cellHighPriority]: groupId === 3,
      })}
      groupingInfo={groupingInfo}
      {...restProps}
    />
  );
});
const GroupingPanelCell = withStyles(groupingStyles, { name: 'GroupingPanelCell' })(({
  group, classes, ...restProps
}) => {
  const groupId = group.id;
  const Icon = getIconById(groupId);
  return (
    <GroupingPanel.Cell
      className={classNames({
        [classes.headerCellLowPriority]: groupId === 1,
        [classes.headerCellMediumPriority]: groupId === 2,
        [classes.headerCellHighPriority]: groupId === 3,
      })}
      group={group}
      {...restProps}
    >
      <Icon
        className={classes.icon}
      />
    </GroupingPanel.Cell>
  );
});

const PrioritySelectorItem = ({
  color, text: resourceTitle,
}) => {
  const text = resourceTitle || '모두';
  const shortText = resourceTitle || '모두';
  const classes = usePrioritySelectorItemStyles({ color });

  return (
    <div className={classes.prioritySelectorItem}>
      <span className={classes.bullet} />
      <span className={classes.priorityText}>{text}</span>
      <span className={classes.priorityShortText}>{shortText}</span>
    </div>
  );
};

const PrioritySelector = withStyles(styles, { name: 'PrioritySelector' })(({
  classes, priorityChange, priority,
}) => {
  const currentPriority = priority > 0 ? priorities[priority - 1] : {};
  return (
    <FormControl className={classes.prioritySelector}>
      <Select
        disableUnderline
        value={priority}
        onChange={(e) => {
          priorityChange(e.target.value);
        }}
        renderValue={() => (
          <PrioritySelectorItem text={currentPriority.text} color={currentPriority.color} />
        )}
      >
        <MenuItem value={0}>
          <PrioritySelectorItem />
        </MenuItem>
        {priorities.map(({ id, color, text }) => (
          <MenuItem value={id} key={id.toString()}>
            <PrioritySelectorItem color={color} text={text} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
});

const FlexibleSpace = withStyles(styles, { name: 'FlexibleSpace' })(({
  classes, priority, priorityChange, ...restProps
}) => (
  <Toolbar.FlexibleSpace {...restProps} className={classes.flexibleSpace}>
    <PrioritySelector priority={priority} priorityChange={priorityChange} />
  </Toolbar.FlexibleSpace>
));
const TooltipContent = ({
  appointmentData, formatDate, appointmentResources,
}) => {
  const resource = appointmentResources[0];
  const classes = useTooltipContentStyles({ color: resource.color });
  let icon = <LowPriority className={classes.icon} />;
  if (appointmentData.priorityId === 2) {
    icon = <Event className={classes.icon} />;
  }
  return (
    <div className={classes.content}>
      <Grid container alignItems="flex-start" className={classes.titleContainer}>
        <Grid item xs={2} className={classNames(classes.textCenter)}>
          <Lens className={classNames(classes.lens, classes.colorfulContent)} />
        </Grid>
        <Grid item xs={10}>
          <div>
            <div className={classNames(classes.title, classes.dateAndTitle)}>
              {appointmentData.title}
            </div>
            <div className={classNames(classes.text, classes.dateAndTitle)}>
              {formatDate(appointmentData.startDate, { day: 'numeric', weekday: 'long' })}
            </div>
          </div>
        </Grid>
      </Grid>
      <Grid container alignItems="center" className={classes.contentContainer}>
        <Grid item xs={2} className={classes.textCenter}>
          <AccessTime className={classes.icon} />
        </Grid>
        <Grid item xs={10}>
          <div className={classes.text}>
            {`${formatDate(appointmentData.startDate, { hour: 'numeric', minute: 'numeric' })}
              - ${formatDate(appointmentData.endDate, { hour: 'numeric', minute: 'numeric' })}`}
          </div>
        </Grid>
      </Grid>
      <Grid container alignItems="center" key={`${resource.fieldName}_${resource.id}`}>
        <Grid
          className={classNames(classes.contentItemIcon, classes.icon, classes.colorfulContent)}
          item
          xs={2}
        >
          {icon}
        </Grid>
        <Grid item xs={10}>
          <span className={classNames(classes.text, classes.colorfulContent)}>
            {resource.text}
          </span>
        </Grid>
      </Grid>
    </div>
  );
};

const today = () => {
  var today = new Date();
  var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  return date;
}

const getDateFormat = (strDate) => {
  var year = strDate.substr(0,4);
  var month = strDate.substr(4,2);
  var date = strDate.substr(6,2);
  var hours = strDate.substr(8,2);
  var minutes = strDate.substr(10,2);
  var seconds = strDate.substr(12,2);
  return new Date(year, month, date, hours, minutes, seconds)
}

export default class ScheduleComponent extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      currentDate: today(),
      currentViewName: '1일',
      data: [],
      currentPriority: 0,
      resources: [{
        fieldName: 'priorityId',
        title: '담당자',
        instances: priorities,
      }],
    };
    this.currentViewNameChange = (currentViewName) => {
      this.setState({ currentViewName });
    };
    this.currentDateChange = (currentDate) => {
      this.setState({ currentDate });
    };
    this.priorityChange = (value) => {
      const { resources } = this.state;
      const nextResources = [{
        ...resources[0],
        instances: value > 0 ? [priorities[value - 1]] : priorities,
      }];

      this.setState({ currentPriority: value, resources: nextResources });
    };
    this.flexibleSpace = connectProps(FlexibleSpace, () => {
      const { currentPriority } = this.state;
      return {
        priority: currentPriority,
        priorityChange: this.priorityChange,
      };
    });
    this.commitChanges = this.commitChanges.bind(this);
  }

  commitChanges({ added, changed, deleted }) {
    this.setState((state) => {
      let { data } = state;
      if (added) {
        const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
        data = [...data, { id: startingAddedId, ...added }];

        let key = startingAddedId;
        let jsonObj = data[key]; //id = key 맞는걸로 넣게끔 나중에 변경

        Axios.post('http://13.125.227.162:8080/api/schedule/post', jsonObj) 
          .then(res => { 
            console.log(res.data) 
          })
          .catch(res => console.log(res))
      }
      if (changed) {
        data = data.map(appointment => (
          changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment));

        let key = Object.keys(changed);
        let jsonObj = data[key]; //id = key 맞는걸로 넣게끔 나중에 변경

        Axios.post('http://13.125.227.162:8080/api/schedule/put', jsonObj) 
          .then(res => { 
            console.log(res.data) 
          })
          .catch(res => console.log(res))

      }
      if (deleted !== undefined) {
        Axios.get("http://13.125.227.162:8080/api/schedule/delete/id/"+deleted)
          .then(res => {
            
          })
          .catch(res => console.log(res))
        data = data.filter(appointment => appointment.id !== deleted);
      }
      // alert(Object.keys(data[0]));
      // alert(Object.values(data[0]));
      return { data };
    });
  }

  componentWillMount() {
    Axios.get("http://13.125.227.162:8080/api/schedule/get")
      .then(res => {
        this.setState({data:res.data});
      })
      .catch(res => console.log(res))
  }

  componentDidUpdate() {
    this.flexibleSpace.update(); 
  }

  render() {
    const {
      data, currentDate, currentViewName, currentPriority, resources,
    } = this.state;

    return (
      <Paper>
        <Scheduler
          data={filterTasks(data, currentPriority)}
          height={660}
          locale="ko-KR"
        >
          <ViewState
            currentDate={currentDate}
            currentViewName={currentViewName}
            onCurrentViewNameChange={this.currentViewNameChange}
            onCurrentDateChange={this.currentDateChange}
          />

          <EditingState
            onCommitChanges={this.commitChanges}
          />
          <IntegratedEditing />

          <GroupingState
            grouping={grouping}
          />

          <DayView
            name="1일"
            startDayHour={9}
            endDayHour={19}
            intervalCount={1}
          />
          <DayView
            name="2일"
            startDayHour={9}
            endDayHour={19}
            intervalCount={2}
          />
          <DayView
            name="3일"
            startDayHour={9}
            endDayHour={19}
            intervalCount={3}
          />
          <DayView
            name="4일"
            startDayHour={9}
            endDayHour={19}
            intervalCount={4}
          />

          <DayView
            name="5일"
            startDayHour={9}
            endDayHour={19}
            intervalCount={5}
          />

          <WeekView
            startDayHour={9}
            endDayHour={19}
            name="일주일"
            timeTableCellComponent={WeekViewTimeTableCell}
            dayScaleCellComponent={WeekViewDayScaleCell}
          />

          <MonthView
            name="한달"
          />

          <AllDayPanel
            cellComponent={AllDayCell}
            messages={AllDayPanelMessage}
          />

          <Appointments />
          <Resources
            data={resources}
          />

          
          <ConfirmationDialog
            messages={ConfirmationDialogMessage}
          />
          <IntegratedGrouping />

          <GroupingPanel
            cellComponent={GroupingPanelCell}
          />
          <Toolbar flexibleSpaceComponent={this.flexibleSpace} />
          <DateNavigator />
          <ViewSwitcher />
          <AppointmentTooltip
            contentComponent={TooltipContent}
            showOpenButton
            showCloseButton
            showDeleteButton
          />
          <AppointmentForm
            messages = {AppointmentFormMessage}
          />
        </Scheduler>
      </Paper>
    );
  }
}