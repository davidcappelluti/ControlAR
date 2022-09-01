import react, {useState} from 'react'
import {View, Text, StyleSheet, StatusBar, FlatList} from 'react-native'
import {courses} from '../data/testdata'
//import StudentCard from '../components/StudentCard.js';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons'; 
import theme from '../UI/theme';
import { StudentCard }from '../components/Cards/Card';

//Almaceno el navigator de tabs en una constante
const Tab = createBottomTabNavigator();

//Para mostrar la subpantalla que muestra los estudiantes, utilizo este componente
function StudentsScreen(props) {
    const [students, setStudents] = useState([])
    //Extraigo la id del curso que estoy mostrando en esta pantalla con el prop route
    const { courseId } = props.route.params;
    //Ejecuto el metodo find al array de cursos que simula la informacion, para encontrar el curso que corresponde a la id que le paso
    const course = courses.find(c => c.id === courseId); //que grande copilot
    setStudents(course.array_alumns)

    const changeidstudent = (id) => {
        // let new_arr = students.map((item)=>{
        //     if (item.student_id === id){
        //         return {...item, active: false}
        //     }
        //     return item
        // })
        // setStudents(new_arr)
    }

    return (
        <View style={styles.container}>
        <FlatList
            style={styles.list}
            data={students}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            renderItem={({ item }) => <StudentCard {...item} handleDelete={changeidstudent} variant={1}/> 
         }
        />
        </View>
    );
}

//Componente que muestra la subpantalla de planillas
function LogsScreen(props) {
    return(
        <View style={styles.container}>
            <Text>LogsScreen</Text>
        </View>
    )
}
//Componente que muestra la pantalla de curso en detalle,
//utiliza los otros componentes
export default function SingleCourseScreen({route,  navigation }) {
    return (
        <View style={styles.container}>
            <Tab.Navigator screenOptions={({route})=>{
                return{
                    tabBarIcon: ({color, size}) => {
                        return <MaterialIcons name="school" size={size} color={color} />
                    },
                    headerTitleAlign: 'center',
                }
            }}>
                <Tab.Screen name="Estudiantes" component={StudentsScreen}
                options={{
                    tabBarIcon: ()=>{
                        return <MaterialIcons name='people' size={24} color={theme.colors.primaryGrey} />
                    }
                }} 
                />

                <Tab.Screen name="Planilla" component={LogsScreen} />

            </Tab.Navigator>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
    }
})