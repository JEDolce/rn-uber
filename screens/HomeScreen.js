import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, Image } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import NavOptions from '../components/NavOptions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_KEY } from '@env';
import { useDispatch } from 'react-redux';
import { setDestination, setOrigin } from '../slices/navSlice';
import NavFavourites from '../components/NavFavourites';

// SafeAreaVire hace que el texto se vea en el cuerpo de la pantalla
// del telefono, de lo contrario se ve bien arriba en la parte donde
// esta la camara y es una cagada

const HomeScreen = () => {
    const dispatch = useDispatch();

    return (
        <SafeAreaView style={tw`bg-white h-full`}>
            <View style={tw`p-5`}>
                <Image
                    style={{
                        width: 100,
                        height: 100,
                        resizeMode: "contain"
                    }}
                    source={{
                        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png"
                    }}
                />

                <GooglePlacesAutocomplete
                    placeholder='Where from?'
                    styles={{
                        container: {
                            flex: 0
                        },
                        textInput: {
                            fontSize: 18
                        }
                    }}
                    onPress={(data, details = null) => {
                        dispatch(setOrigin({
                            location: details.geometry.location,
                            desccription: data.description,
                        }));

                        dispatch(setDestination(null));
                    }}
                    fetchDetails={true}
                    returnKeyType={"search"}
                    enablePoweredByContainer={false}
                    minLength={2}
                    query={{
                        key: GOOGLE_MAPS_KEY,
                        language: 'en'
                    }}
                    nearbyPlacesAPI='GooglePlacesSearch'
                    debounce={400}
                />
                <NavOptions />
                <NavFavourites />
            </View>
        </SafeAreaView>
    )
}

export default HomeScreen;
