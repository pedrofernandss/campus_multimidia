import { Image, View, Text, Animated, FlatList, Dimensions, StyleSheet } from 'react-native';
import { fetchTags } from '@/functions/tagsFunctions';
import React, { useEffect, useRef, useState } from 'react';
import { icons, types } from '@/constants';
import standard from '@/theme';
import TrendingItem from './TrendingItem';

const { width } = Dimensions.get('window');

const Trendings: React.FC = () => {

    const [tags, setTags] = useState<types.Tag[]>([]);
    const translateX = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const loadTags = async () => {
            try {
                const fetchedTags = await fetchTags();
                setTags(fetchedTags);
            } catch (error) {
                console.error("Erro ao buscar as tags: ", error);
            }
        };

        loadTags();
    }, []);

    return (
        <View>
            <View style={styles.innerContainer}>
                <Image 
                    source={icons.trendingIcon}
                    style={styles.trendingIcon}
                    resizeMode="contain"           
                />
                <Text style={styles.labelText}>Em alta</Text>
                <View style={styles.trendingTextList}>
                    <FlatList
                        data={tags}
                        horizontal={true}
                        keyExtractor={(tag) => tag.id.toString()}
                        renderItem={({ item }) => <TrendingItem tag={item}/> }
                        scrollEnabled={true}
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    innerContainer: {
        flexDirection: 'row', 
        alignItems: 'center', 
    },
    trendingIcon:{
        width: width * 0.09,
        height: width * 0.09,
    },
    labelText: {
        marginLeft: 4, 
        marginRight: 8, 
        fontSize: width * 0.05, 
        fontFamily: standard.fonts.semiBold, 
        color: 'black',
    },
    trendingTextList:{
        flexDirection: 'row',
        overflow: 'hidden'
    }
});

export default Trendings;
