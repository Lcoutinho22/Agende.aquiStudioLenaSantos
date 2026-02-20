// TEMA
        function toggleTheme() {
            const body = document.body;
            const icon = document.querySelector('.theme-toggle i');
            body.classList.toggle('light-theme');
            if(body.classList.contains('light-theme')){
                icon.classList.replace('fa-sun', 'fa-moon');
                localStorage.setItem('theme', 'light');
            } else {
                icon.classList.replace('fa-moon', 'fa-sun');
                localStorage.setItem('theme', 'dark');
            }
        }
        if(localStorage.getItem('theme') === 'light') {
            document.body.classList.add('light-theme');
            document.querySelector('.theme-toggle i').classList.replace('fa-sun', 'fa-moon');
        }

        // LÓGICA DE HORÁRIOS DINÂMICOS
        function updateTimeSlots() {
            const serviceSelect = document.getElementById('serviceSelect');
            const timeSelect = document.getElementById('clientTime');
            const display = document.getElementById('durationDisplay');
            const durationText = document.getElementById('durationText');
            
            const selectedOption = serviceSelect.options[serviceSelect.selectedIndex];
            const durationMinutes = parseInt(selectedOption.getAttribute('data-duration'));

            // Atualiza texto de duração
            if(durationMinutes) {
                const h = Math.floor(durationMinutes / 60);
                const m = durationMinutes % 60;
                let timeString = "";
                if(h > 0) timeString += `${h}h `;
                if(m > 0) timeString += `${m}m`;
                
                durationText.innerText = `Tempo reservado na agenda: ${timeString}`;
                display.classList.add('visible');
            }

            // Limpa horários
            timeSelect.innerHTML = '<option value="" disabled selected>Escolha o horário...</option>';

            const startHour = 9; // 09:00
            const endHour = 19;  // 19:00 (fim do expediente)
            
            // O intervalo entre horários é baseado na duração do serviço selecionado
            let interval = durationMinutes; 
            
            let currentTimeInMinutes = startHour * 60;
            const endTimeInMinutes = endHour * 60;

            while (currentTimeInMinutes + durationMinutes <= endTimeInMinutes) {
                const h = Math.floor(currentTimeInMinutes / 60);
                const m = currentTimeInMinutes % 60;
                
                const formattedTime = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
                
                const option = document.createElement('option');
                option.value = formattedTime;
                option.text = formattedTime;
                timeSelect.add(option);

                currentTimeInMinutes += interval;
            }
        }

        // AGENDAMENTO NO WHATSAPP
        function agendarWhatsApp() {
            const nome = document.getElementById('clientName').value;
            const select = document.getElementById('serviceSelect');
            const servico = select.value;
            
            const durationMinutes = parseInt(select.options[select.selectedIndex].getAttribute('data-duration'));
            const h = Math.floor(durationMinutes / 60);
            const m = durationMinutes % 60;
            let duracaoTexto = (h > 0 ? `${h}h` : "") + (m > 0 ? `${m}m` : "");

            const data = document.getElementById('clientDate').value;
            const hora = document.getElementById('clientTime').value;
            const obs = document.getElementById('clientObs').value;
            
            let dataFormatada = "";
            if(data) {
                const [ano, mes, dia] = data.split('-');
                dataFormatada = `${dia}/${mes}/${ano}`;
            }

            let mensagem = `Olá Lena! ✨%0A%0AGostaria de solicitar um horário:%0A%0A`;
            mensagem += `👤 *Cliente:* ${nome}%0A`;
            mensagem += `💅 *Procedimento:* ${servico}%0A`;
            if(duracaoTexto) mensagem += `⏳ *Tempo:* ${duracaoTexto}%0A`;
            
            if(dataFormatada) mensagem += `📅 *Data:* ${dataFormatada}%0A`;
            if(hora) mensagem += `⏰ *Hora:* ${hora}%0A`;
            if(obs) mensagem += `📝 *Obs:* ${obs}%0A`;
            
            mensagem += `%0AAguardando confirmação! 🥰`;

            const numeroWhatsApp = "558994318707"; 

            window.open(`https://wa.me/${numeroWhatsApp}?text=${mensagem}`, '_blank');
        }

        function infoCurso() {
            const msg = "Olá Lena! Tenho interesse no Curso Profissional. Poderia me enviar valores e conteúdo? 🎓";
            const num = "558994318707";
            window.open(`https://wa.me/${num}?text=${msg}`, '_blank');
        }