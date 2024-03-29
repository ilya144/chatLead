import moment from 'moment';

export const defaultValuesForNewMessages = {
    text: {text: '', keyboard: []},
    photo: {photo: '', keyboard: []},
    audio: {audio: '', keyboard: []},
    video: {video: '', keyboard: []},
    file: {file: '', keyboard: []},
    type_processing: { type_processing: { delay: 5 } },
    card: {card: [{photo: '', title: '', text: '', keyboard: []}]},
    gallery: {gallery: [{photo: '', title: '', text: '', keyboard: []}]},
    list: {list: [{photo: '', title: '', text: '', keyboard: []}, {photo: '', title: '', text: '', keyboard: []}]},
    pause_delay: {timer: { pause_delay: '' }, keyboard: []},
    activity_lost: {timer: { activity_lost: '' }, keyboard: []},
    send_time: {timer: { send_time: moment().format('YYYY-MM-DD') }, keyboard: []},
    form: {form: [""], keyboard: []}
};

export const buttonsTypes = {
    text_buttons: 'text_buttons',
    url_buttons: 'url_buttons',
    fast_buttons: 'fast_buttons'
};

export const defaultValuesForNewButtons = {
    text_buttons: { caption: '', type: 'text_buttons' },
    url_buttons: { caption: '', url: '', type: 'url_buttons' },
    fast_buttons: { caption: '', payload: { trigger_id: ''}, type: 'fast_buttons' }
};

export const tagsTypes = {
    AddTags: 'Add_Tags',
    Remove_Tags: 'Remove_Tags'
};

export const tagsTranscription = {
  Add_Tags: 'Добавить тег',
  Remove_Tags: 'Удалить тег'
};

export const destinationScenario = {
    default: 'undefined',
    broadcast: 'broadcast',
    autoride: 'autoride'
};