import React, { useState, useEffect } from 'react';

import { format, parseISO } from 'date-fns';
import { Link } from 'react-router-dom';
import Loader from 'react-loader-spinner';

import { MdAddCircleOutline, MdDateRange, MdLocationOn } from 'react-icons/md';

import api from '~/services/api';

import { Container, MeetupsList, Meetup } from './styles';

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [meetups, setMeetups] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await api.get('organizers');

      const data = response.data.map(meetup => {
        return {
          ...meetup,
          formattedDate: format(parseISO(meetup.date), "dd/MM/Y 'às' HH'h'mm"),
        };
      });

      setMeetups(data);
      setLoading(false);
    })();
  }, []);

  return (
    <Container>
      {!loading && (
        <header>
          <h2>My Meetups</h2>
          <Link to="meetups/create">
            <MdAddCircleOutline color="#fff" size={22} />
            Create a Meetup
          </Link>
        </header>
      )}

      <MeetupsList>
        {loading && (
          <aside>
            <Loader type="TailSpin" color="#F94D6A" width={32} height={32} />
          </aside>
        )}

        {!loading && !meetups.length && (
          <aside>
            You didn't create any meetup yet. Create the first one now!
          </aside>
        )}

        {!loading &&
          meetups.map(meetup => (
            <Meetup
              to={`/meetups/${meetup.id}`}
              key={meetup.id}
              past={meetup.past ? 1 : 0}
            >
              <h3>{meetup.title}</h3>
              <div>
                <p>
                  <MdDateRange size={16} />
                  {meetup.formattedDate}
                </p>
                <p>
                  <MdLocationOn size={16} />
                  {meetup.location}
                </p>
              </div>
            </Meetup>
          ))}
      </MeetupsList>
    </Container>
  );
}
