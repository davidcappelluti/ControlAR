import react from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";
import Constants from 'expo-constants';
import TopBar from "./TopBar";
import CoursesContainer from "./CoursesContainer";

export default function Main() {
    return (
        <View style={styles.container}>
            <TopBar title="Mis cursos"/>
            <CoursesContainer/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
    }
});