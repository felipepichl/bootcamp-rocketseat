import React, { useState } from 'react';

import { FiPower, FiClock } from 'react-icons/fi';
import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  Schedule,
  NextAppointment,
  Section,
  Appointment,
  Calendar,
} from './styles';

import logoImg from '../../assets/logo.svg';
import { useAuth } from '../../hooks/auth';

const Dashboard: React.FC = () => {
  const [seletedDate, setSelectedDate] = useState(new Date());
  const { signOut, user } = useAuth();

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="" />

          <Profile>
            <img src={user.avatar_url} alt={user.name} />

            <div>
              <span>Bem-Vindo,</span>
              <strong>{user.name}</strong>
            </div>
          </Profile>

          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>

      <Content>
        <Schedule>
          <h1>Horários agendados</h1>
          <p>
            <span>Hoje</span>
            <span>Dia 06</span>
            <span>Segunda-feira</span>
          </p>

          <NextAppointment>
            <strong>Atendimento a seguir</strong>
            <div>
              <img
                src="https://avatars3.githubusercontent.com/u/22602639?s=460&u=2c1bec46e256602d1dd5f173b152233fc58f2855&v=4"
                alt="Felipe Pichl"
              />

              <strong>Felipe Pichl</strong>
              <span>
                <FiClock />
                08:00
              </span>
            </div>
          </NextAppointment>

          <Section>
            <strong>Manhã</strong>

            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>

              <div>
                <img
                  src="https://avatars3.githubusercontent.com/u/22602639?s=460&u=2c1bec46e256602d1dd5f173b152233fc58f2855&v=4"
                  alt="Felipe Pichl"
                />

                <strong>Felipe Pichl</strong>
              </div>
            </Appointment>

            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>

              <div>
                <img
                  src="https://avatars3.githubusercontent.com/u/22602639?s=460&u=2c1bec46e256602d1dd5f173b152233fc58f2855&v=4"
                  alt="Felipe Pichl"
                />

                <strong>Felipe Pichl</strong>
              </div>
            </Appointment>
          </Section>

          <Section>
            <strong>Tarde</strong>

            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>

              <div>
                <img
                  src="https://avatars3.githubusercontent.com/u/22602639?s=460&u=2c1bec46e256602d1dd5f173b152233fc58f2855&v=4"
                  alt="Felipe Pichl"
                />

                <strong>Felipe Pichl</strong>
              </div>
            </Appointment>
          </Section>
          <Calendar />
        </Schedule>
      </Content>
    </Container>
  );
};

export default Dashboard;
