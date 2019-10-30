import { format, parseISO } from 'date-fns';
import { enUS } from 'date-fns/locale';

import Mail from '../../lib/Mail';

class NewSubscriptionMail {
  get key() {
    return 'NewSubscriptionMail';
  }

  async handle({ data }) {
    const { meetup, user } = data;

    await Mail.sendMail({
      to: `${meetup.organizer.name} <${meetup.organizer.email}>`,
      subject: `New subscription to (${meetup.title})`,
      template: 'newSubscription',
      context: {
        organizer: meetup.organizer.name,
        meetupTitle: meetup.title,
        meetupDate: format(parseISO(meetup.date), "MMMM dd', at' H:mm'h'", {
          locale: enUS,
        }),
        userName: user.name,
        userEmail: user.email,
      },
    });
  }
}

export default new NewSubscriptionMail();
