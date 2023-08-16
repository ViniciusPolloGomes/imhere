import { TextInput,Text, View , TouchableOpacity, ScrollView , FlatList, Alert} from 'react-native';
import React,{useState} from 'react';
import {styles} from './styles';
import {Participants} from '../../components/Participants/index';

export default function Home() {
    const [participants,setParticipants]=useState<string[]>([]);
    const [participantName,setParticipantName]=useState('');

    function handleParticipantAdd(){
        if(participants.includes(participantName)){
            setParticipantName('');
            return Alert.alert("Participante existe","Já existe um participante na lista com esse nome.");   
        }
        setParticipants(prevState=>[...prevState, participantName]);
        setParticipantName('');
    }

    function handleParticipantsRemove(name : string){
        Alert.alert("Remover",`Remover o participante ${name}?`, [
        {
            text: 'Sim',
            onPress:()=> {
                setParticipants(prevState => prevState.filter(participant => participant !== name))
                Alert.alert("Deletado!")        
            }
        },
        {
            text:'Não',
            style: 'cancel'
        }
    ])
    setParticipantName('')
    }

  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>
        Nome do Evento
      </Text>
      <Text style={styles.eventDate}>
        Sexta, 4 de Novembro de 2022.
      </Text>
      <View style={styles.form}>
            <TextInput 
                style={styles.input}
                placeholder="Nome do participante"
                placeholderTextColor="#6B6B6B"
                onChangeText={setParticipantName}  
                value={participantName}
            />
            <TouchableOpacity style={styles.button} onPress={handleParticipantAdd}>
                <Text style={styles.buttonText}>
                    +
                </Text>
            </TouchableOpacity>
       </View>
        <FlatList
            data={participants}
            keyExtractor={item=>item}
            renderItem={({item})=>(
                <Participants   
                    key={item}
                    name={item} 
                    onRemove={()=> handleParticipantsRemove(item)}
                />
            )}
            showsVerticalScrollIndicator={false}
        />
            
        
    </View>
  )
}
