import React from 'react';
import MapView, { Callout } from 'react-native-maps';
import geolib from 'geolib';
import {
    StyleSheet,
    View,
    Dimensions,
    ScrollView,
    Image
} from 'react-native';
import {
    Container,
    Content,
    Footer,
    FooterTab,
    Button,
    Card,
    CardItem,
    Spinner,
    Text,
    Left,
    Body,
    Right,
    Thumbnail,
    Icon
} from 'native-base';
import config from './config';
class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            loading: true,
            marker: {

            },
            coords: {},
            search: false,
            streetName: '',
            region: []
        };
    }
    componentWillMount() {
        //ambil fine location
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    coords: position.coords,
                    error: null
                });
            },
            (error) => this.setState({ error: error.message }),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        );
        //ambil data dari database (mysql)
        fetch(config.apiUrl)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    dataSource: responseJson
                }, function () {
                    //this.setState({ loading: false })
                });
            })
            .catch((error) => {
                console.error(error);
            }).done();


    }
    //saat sliding dilakukan ini jalan terus
    onRegionChange(region) {
        console.log(region)
    }
    //saat region udah ditentukan atau sliding kelar ini jalan
    onRegionChangeComplete(region) {
        this.setState({ region: region })
        alert(JSON.stringify(this.state.region))
    }
    render() {
        if (this.state.coords != null) {
            //fetch('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + this.state.coords.latitude + ',' + this.state.coords.longitude + '&key=AIzaSyAG4vEyGytmSU8B5YR5cw6e0axEN58wQv0#')
            fetch('https://api.myjson.com/bins/ws2o6#')
                .then((response) => response.json())
                .then((responseJson) => {
                    this.setState({
                        streetName: responseJson.results[0].formatted_address
                    }, function () {
                        this.setState({ loading: false })
                    });
                })
                .catch((error) => {
                    console.error(error);
                }).done();
        }
        const { width, height } = Dimensions.get('window');
        const ratio = width / height;
        if (this.state.loading) {
            return (
                <Spinner color='blue' />
            );
        } else {
            return (
                <Container>
                    <Content scrollEnabled={false}>
                        <Button info rounded full onPress={() => this.setState({ search: true })}>
                            <Text>Search Shop Nearby</Text>
                        </Button>
                        {this.state.error ? <Text>Error: {this.state.error}</Text> : null}
                        <Text>{this.state.streetName}</Text>
                        {this.state.search ?
                            <View style={{ width, height
                             //justifyContent: 'center', alignItems: 'center' 
                             }}>
                                {this.state.loading ? (
                                    <Spinner color='blue' />
                                ) : (
                                        <ScrollView>
                                            {
                                                this.state.dataSource.map((dataSource, index) => {
                                                    var jarak = geolib.convertUnit('km', geolib.getDistance((this.state.coords), {
                                                        latitude: dataSource.latitude,
                                                        longitude: dataSource.longitude
                                                    }), 2)
                                                    console.log(jarak + ' ke ' + dataSource.storeName)
                                                    if (jarak <= 30) {
                                                        return (
                                                            <Card key={index}>
                                                                <CardItem button onPress={() => alert(dataSource.storeName)}>
                                                                    <Left>
                                                                        <Thumbnail source={{ uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png' }} />
                                                                        <Body>
                                                                            <Text>{dataSource.storeName}</Text>
                                                                            <Text note>{dataSource.phoneNumber}</Text>
                                                                            <Text note>{jarak} km</Text>
                                                                        </Body>
                                                                    </Left>
                                                                </CardItem>
                                                            </Card>
                                                        )
                                                    } else {
                                                        null
                                                    }
                                                })
                                            }
                                        </ScrollView>

                                        // <MapView
                                        //     style={styles.map}
                                        //     region={{
                                        //         latitude: this.state.coords.latitude,
                                        //         longitude: this.state.coords.longitude,
                                        //         latitudeDelta: 0.0922,
                                        //         longitudeDelta: 0.0922 * ratio
                                        //     }}
                                        // >
                                        //     <MapView.Marker
                                        //         coordinate={{
                                        //             latitude: this.state.coords.latitude,
                                        //             longitude: this.state.coords.longitude
                                        //         }}
                                        //     >
                                        //         <View style={styles.radius}>
                                        //             <View style={styles.marker}></View>
                                        //         </View>
                                        //     </MapView.Marker>
                                        //     {this.state.dataSource.map((dataSource, index) => {
                                        //         var jarak = geolib.convertUnit('km', geolib.getDistance((this.state.coords), {
                                        //             latitude: dataSource.latitude,
                                        //             longitude: dataSource.longitude
                                        //         }), 2)
                                        //         console.log(jarak + ' ke ' + dataSource.storeName)
                                        //         if (jarak <= 5) {
                                        //             return (
                                        //                 <MapView.Marker
                                        //                     key={index}
                                        //                     coordinate={{
                                        //                         latitude: parseFloat(dataSource.latitude),
                                        //                         longitude: parseFloat(dataSource.longitude)
                                        //                     }}
                                        //                     title={dataSource.storeName}
                                        //                     description={dataSource.phoneNumber}
                                        //                 />)
                                        //         } else {
                                        //             null
                                        //         }
                                        //     }
                                        //     )}
                                        // </MapView>

                                        // vvvv INI UNTUK ADD STORE vvvv
                                        // <MapView
                                        //     style={styles.map}
                                        //     initialRegion={{
                                        //         latitude: this.state.coords.latitude,
                                        //         longitude: this.state.coords.longitude,
                                        //         latitudeDelta: 0.0922,
                                        //         longitudeDelta: 0.0922 * ratio
                                        //     }}
                                        //     onRegionChange={this.onRegionChange}
                                        //     onRegionChangeComplete={(region) => { this.onRegionChangeComplete(region) }}

                                        // >
                                        // </MapView>
                                    )
                                }
                                {/* <View style={styles.calloutView}>
                                    <Icon name='ios-pin' style={{fontSize:36, color:'red'}}/>
                                    <Text/>
                                    <Text/>
                                    <Text/>
                                </View> */}
                            </View>
                            : null}
                    </Content>
                    {/* <Footer>
                        <FooterTab>
                            <Button onPress={() => this.props.navigation.navigate('Login')}>
                                <Text>Seller</Text>
                            </Button>
                        </FooterTab>
                    </Footer> */}
                </Container >
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
    },
    map: {
        marginTop: 1.5,
        ...StyleSheet.absoluteFillObject,
    },
    radius: {
        height: 50,
        width: 50,
        borderRadius: 50 / 2,
        overflow: 'hidden',
        backgroundColor: 'rgba(0,122,255,0.1)',
        borderWidth: 1,
        borderColor: 'rgba(0,112,255,0.3)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    marker: {
        height: 20,
        width: 20,
        borderRadius: 20 / 2,
        overflow: 'hidden',
        backgroundColor: '#007AFF',
        borderWidth: 1,
        borderColor: 'white'
    },
    calloutView: {
        position: 'absolute',
        //alignItems: "center",
        // marginLeft: "50%",
        // marginRight: "50%",
        // marginTop: "50%",
        //marginBottom:50
    }
});
export default Main