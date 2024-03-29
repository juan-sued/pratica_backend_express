import express from 'express';
import cors from 'cors';
import dayjs from 'dayjs';
//imports

const server = express();

server.use(cors());

const holidays = [
  { date: '1/1/2022', name: 'Confraternização mundial' },
  { date: '1/3/2022', name: 'Carnaval' },
  { date: '4/17/2022', name: 'Páscoa' },
  { date: '4/21/2022', name: 'Tiradentes' },
  { date: '5/1/2022', name: 'Dia do trabalho' },
  { date: '6/16/2022', name: 'Corpus Christi' },
  { date: '9/7/2022', name: 'Independência do Brasil' },
  { date: '10/12/2022', name: 'Nossa Senhora Aparecida' },
  { date: '11/2/2022', name: 'Finados' },
  { date: '11/15/2022', name: 'Proclamação da República' },
  { date: '12/25/2022', name: 'Natal' }
];

function getDay() {
  const isTodayHoliday = holidays.findIndex(
    holiday => holiday.date === `${dayjs().format('M/DD')}/2022`
  );

  if (isTodayHoliday >= 0) {
    return `Sim, hoje é ${holidays[isTodayHoliday].name}`;
  } else {
    return 'Não, hoje não é feriado';
  }
}

const holidayList = holidays.map(holiday => holiday.name);
server.get('/holidays', (request, response) => {
  response.send(holidayList);
});

server.get('/is-today-holiday', (request, response) => {
  response.send(getDay());
});

server.get('/holidays/:idMonth', (request, response) => {
  const idMonth = parseInt(request.params.idMonth);

  const mouthsRequests = holidays.filter(
    holiday => parseInt(holiday.date.split('/')[0]) === idMonth
  );

  const holidaysMonth = mouthsRequests.map(dateHoliday => dateHoliday.name);

  response.send(holidaysMonth);
});

server.listen(5000);
